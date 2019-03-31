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
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/positem")]
    [Authorize]
    public class PosController : ApiControllerBase
    {
        private IPosService _posService;
        private IApplicationUserService _appUserService;

        public PosController(IErrorService errorService, IPosService posService, IApplicationUserService appUserService) : base(errorService)
        {
            this._posService = posService;
            this._appUserService = appUserService;
        }
        public string ConvertNumber(string str)
        {

            string monney = "";
            for (var i = 0; i < str.Length; i++)
            {
                if (str[i] != ',')
                {
                    monney = monney + str[i];
                }
            }
            return monney.ToString();
        }
        [Route("getall")]
        [HttpGet]
       
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _posService.GetAll();

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }
        
        [Route("getbyitemid/{id:Guid}")]
        [HttpGet]
  
        public HttpResponseMessage Get(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _posService.GetByItemID(id);

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }

        [Route("search")]
        [HttpGet]

        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _posService.GetAll(key);

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }
        [Route("getbyid/{id:Guid}")]
        [HttpGet]
 
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var ItemOption = _posService.GetByID(id);

                var ItemOptionVm = Mapper.Map<ItemOptionViewModel>(ItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemOptionVm);

                return response;
            });
        }

        [Route("getbyitemcategoryid/{id:Guid}")]
        [HttpGet]
  
        public HttpResponseMessage GetByItemCategoryID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var ItemOption = _posService.GetByItemCategoryID(id);

                var ItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(ItemOption);

                response = request.CreateResponse(HttpStatusCode.OK, ItemOptionVm);
                return response;

            });
        }
        [Route("getitemsaleinvoice/{id:Guid}")]
        [HttpGet]
 
        public HttpResponseMessage getitemsaleinvoice(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                var ItemOptionList = _posService.GetItem_SaleInvoice(id);
                var ItemOptionListVm = Mapper.Map<List<ItemOptionViewModel>>(ItemOptionList);
                response = request.CreateResponse(HttpStatusCode.OK, ItemOptionListVm);
                return response;
            });
        }
        [Route("getitemsaleinvoice1/{id:Guid}")]
        [HttpGet]
     
        public HttpResponseMessage getitemsaleinvoice1(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var cartItem = _posService.GetItem_SaleInvoice1(id);
                var cartItemVm = Mapper.Map<List<CartViewModel>>(cartItem);
                response = request.CreateResponse(HttpStatusCode.OK, cartItemVm);
                return response;

            });
        }

        ///lấy mã sku khi thêm mới hàng hóa
        [Route("getSKU")]
        [HttpGet]
        public HttpResponseMessage getSKU(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string sku = AutoCode.MaTuSinh("HH", _posService.getCode());
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, sku);
                return response;
            });
        }
        [Route("update")]
        [HttpPut]
       
        public HttpResponseMessage Update(HttpRequestMessage request, ItemOptionViewModel ItemOptionVm)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var dbItemOption = _posService.GetByID(ItemOptionVm.ID);

                    dbItemOption.UpdateItemOption(ItemOptionVm);
                    dbItemOption.ModifiedDate = DateTime.Now;
                    dbItemOption.ModifiedBy = User.Identity.Name;
                    _posService.Update(dbItemOption);
                    _posService.SaveChanges();

                    var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(dbItemOption);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}