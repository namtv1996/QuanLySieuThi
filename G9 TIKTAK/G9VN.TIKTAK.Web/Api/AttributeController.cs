using G9VN.TIKTAK.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using G9VN.TIKTAK.Service;
using System.Net.Http;
using G9VN.TIKTAK.Web.Models;
using AutoMapper;
using System.Net;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/attribute")]
    [Authorize]
    public class AttributeController : ApiControllerBase
    {
        private IAttributeService _attributeService;
        //tiêm sự phụ thuộc qua construtor
        // thông qua DI Autofac _attributeService = new AttributeSevice;
        public AttributeController(IErrorService errorService,IAttributeService _attributeService) : base(errorService)
        {
            this._attributeService = _attributeService;
        }
        [Route("search")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage search(HttpRequestMessage request,string key)
        {
            return CreateHttpResponse(request,()=> {
                var attribute = _attributeService.search(key);
                IEnumerable<AttributeViewModel> attributeVm = Mapper.Map<IEnumerable<AttributeViewModel>>(attribute);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, attributeVm);
                return response;
            });
        }
        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<Model.Models.Attribute> item)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    foreach (var data in item)
                    {
                        data.AttributeID = Guid.NewGuid();
                        _attributeService.add(data);
                        _attributeService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<AttributeViewModel>>(item);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }
        [Route("getAll")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage getAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () => {
                var attribute = _attributeService.getAll();
                IEnumerable<AttributeViewModel> attributeVm = Mapper.Map<IEnumerable<AttributeViewModel>>(attribute);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, attributeVm);
                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage create(HttpRequestMessage request, AttributeViewModel attributeVm)
        {
            return CreateHttpResponse(request, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    G9VN.TIKTAK.Model.Models.Attribute attribute = new G9VN.TIKTAK.Model.Models.Attribute();
                  
                    attribute.UpdateAttribute(attributeVm);
                    try
                    {
                        attribute.AttributeID = Guid.NewGuid();
                        _attributeService.add(attribute);
                        _attributeService.SaveChanges();
                        //mapping
                        var responseData = Mapper.Map<G9VN.TIKTAK.Model.Models.Attribute, AttributeViewModel>(attribute);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }
        [Route("getByName")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage getByName(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () => {
                var attribute = _attributeService.getByName(key);
              AttributeViewModel attributeVm = Mapper.Map<AttributeViewModel>(attribute);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, attributeVm);
                return response;
            });
        }
    }
}