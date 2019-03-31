using AutoMapper;
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

    [RoutePrefix("api/posObjectCategory")]
    [Authorize]
    public class PosCategoryController : ApiControllerBase
    {
        private IPosObjectCategoryService _posCategoryService;

        public PosCategoryController(IErrorService errorService, IPosObjectCategoryService objectCategoryService) : base(errorService)
        {
            this._posCategoryService = objectCategoryService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectCategory = _posCategoryService.GetByObjectKind(1);

                var listObjectCategoryVm = Mapper.Map<List<ObjectCategoryViewModel>>(listObjectCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectCategoryVm);

                return response;
            });
        }
    }
}
