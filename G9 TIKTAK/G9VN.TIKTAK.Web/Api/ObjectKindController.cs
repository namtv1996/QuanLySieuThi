using AutoMapper;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/objectkind")]
    [Authorize]
    public class ObjectKindController: ApiControllerBase
    {
        private IObjectKindService _objectKindService;
        public ObjectKindController(IErrorService errorService, IObjectKindService _objectKindService) : base(errorService)
        {
            this._objectKindService = _objectKindService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectKind = _objectKindService.GetAll();

                var listObjectKindVm = Mapper.Map<List<ObjectKindViewModel>>(listObjectKind);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectKindVm);

                return response;
            });
        }
    }
}