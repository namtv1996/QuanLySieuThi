using AutoMapper;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/Region")]
    [Authorize]
    public class RegionController : ApiControllerBase
    {
        private IRegionService _regionService;
        public RegionController(IErrorService errorService, IRegionService regionService): base(errorService)
        {
            this._regionService = regionService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listRegion = _regionService.GetAll();

                var listRegionVm = Mapper.Map<List<RegionViewModel>>(listRegion);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listRegionVm);

                return response;
            });
        }
        [Route("getone")]
        [HttpGet]
        public HttpResponseMessage Getone(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listRegionone = _regionService.GetOne(1);

                var listRegiononeVm = Mapper.Map<List<RegionViewModel>>(listRegionone);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listRegiononeVm);

                return response;
            });
        }
        [Route("getaddress")]
        [HttpGet]
        public HttpResponseMessage getaddress(HttpRequestMessage request, Guid key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listAddress = _regionService.GetAddress(key);

                var listAddressVm = Mapper.Map<List<RegionViewModel>>(listAddress);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listAddressVm);

                return response;
            });
        }
    }
}