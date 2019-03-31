using AutoMapper;
using G9VN.TIKTAK.Model.Models;
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
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{   [RoutePrefix("api/attributedetail")]
    [Authorize]
    public class AttributeDetailController:ApiControllerBase
    {
        private IAttributeDetailService _attributeDetailService;
        public AttributeDetailController(IErrorService _errorService,IAttributeDetailService _attributeDetailService):base(_errorService)
        {
            this._attributeDetailService = _attributeDetailService;
        }
        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<Model.Models.AttributeDetail> item)
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
                        data.AttributeDetailID = Guid.NewGuid();
                        _attributeDetailService.Add(data);
                        _attributeDetailService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<AttributeDetailViewModel>>(item);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage create(HttpRequestMessage request, List<AttributeDetailViewModel> attributeDetailVm)
        {
            return CreateHttpResponse(request, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    //List<AttributeDetail> attributeDetail = new List<AttributeDetail>();                  
                   
                        for(int i = 0; i < attributeDetailVm.Count(); i++)
                        {
                        AttributeDetail attributeDetail = new AttributeDetail();
                            attributeDetail.value = attributeDetailVm[i].value;
                            attributeDetail.AttributeID = attributeDetailVm[i].AttributeID;
                            attributeDetail.ItemOptionID = attributeDetailVm[i].ItemOptionID;
                            attributeDetail.AttributeDetailID = Guid.NewGuid();
                            _attributeDetailService.Add(attributeDetail);
                            _attributeDetailService.SaveChanges();
                        }               
                        //mapping
                       //var responseData = Mapper.Map<List<AttributeDetailViewModel>>(attributeDetail);
                        response = request.CreateResponse(HttpStatusCode.Created);
                   
                 
                }
                return response;
            });
        }
        [Route("getByItemOptionID/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage getByItemOptionID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () => {
                var listAttributeDetail = _attributeDetailService.getByItemOptionID(id);
                var listAttributeDetailVm = Mapper.Map<List<AttributeDetailViewModel>>(listAttributeDetail);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listAttributeDetailVm);
                return response;
            });
        }
        [Route("getListAttribute/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage getListAttribute(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () => {
                var listAttributeDetailVm = _attributeDetailService.getListAttribute(id); 
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listAttributeDetailVm);
                return response;
            });
        }
        [Route("update")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage update(HttpRequestMessage request, List<AttributeDetailViewModel> attributeDetailVm)
        {
            return CreateHttpResponse(request, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    //lấy ds cần update 
                    List<AttributeDetail> listAttributeDetail = _attributeDetailService.getByItemOptionID(attributeDetailVm[0].ItemOptionID).ToList();

                    if (listAttributeDetail.Count() == attributeDetailVm.Count())
                    {
                        for (int i = 0; i < listAttributeDetail.Count(); i++)
                        {
                            listAttributeDetail[i].value = attributeDetailVm[i].value;
                            listAttributeDetail[i].AttributeID = attributeDetailVm[i].AttributeID;
                            _attributeDetailService.UpdateAttributeDetail(listAttributeDetail[i]);
                            _attributeDetailService.SaveChanges();
                        }
                    }
                    else
                    {
                        for (int i = 0; i < listAttributeDetail.Count(); i++)
                        {
                            _attributeDetailService.Delete(listAttributeDetail[i]);
                            _attributeDetailService.SaveChanges();
                        }
                        for (int i = 0; i < attributeDetailVm.Count(); i++)
                        {
                            AttributeDetail attr = new AttributeDetail();
                            attr.AttributeDetailID = Guid.NewGuid();
                            attr.value = attributeDetailVm[i].value;
                            attr.AttributeID = attributeDetailVm[i].AttributeID;
                            attr.ItemOptionID = attributeDetailVm[i].ItemOptionID;
                            _attributeDetailService.Add(attr);
                            _attributeDetailService.SaveChanges();
                        }
                    }
                    response = request.CreateResponse(HttpStatusCode.Created);


                }
                return response;
            });
        }

        //xóa tất cả thuộc tính của tùy chọn hàng hóa
        [Route("deleteAttributeDetail")]
         [HttpDelete]
        [Authorize(Roles = "Item_Delete")]
        public HttpResponseMessage deleteAttributeDetail(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () => {
                var listAttributeDetailVm = _attributeDetailService.getListAttribute(id);
                _attributeDetailService.deleteAttributeDetail(id);
                _attributeDetailService.SaveChanges();
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listAttributeDetailVm);
                return response;
            });
        }
    }
}