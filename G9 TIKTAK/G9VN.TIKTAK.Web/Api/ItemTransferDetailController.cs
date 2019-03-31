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
    [RoutePrefix("api/itemTransferDetail")]
   
    public class ItemTransferDetailController : ApiControllerBase
    {
        private IItemTransferDetailService _itemTransferDetailService;
        public ItemTransferDetailController(IErrorService errorService, IItemTransferDetailService itemTransferDetailService) : base(errorService)
        {
            this._itemTransferDetailService = itemTransferDetailService;
        }
        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var ItemTransferDetail = _itemTransferDetailService.GetByVoucherID(id);

                var ItemTransferDetailVm = Mapper.Map<List<ItemTransferDetailViewModel>>(ItemTransferDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemTransferDetailVm);

                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ItemTransferDetailViewModel itemTransferDetailVm)
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
                    StockTransferDetail itemTransferDetail = new StockTransferDetail();
                    itemTransferDetail.UpdateItemTransferDetail(itemTransferDetailVm);
                    itemTransferDetail.VoucherDetailID = Guid.NewGuid();
                   
                    try
                    {
                        _itemTransferDetailService.Add(itemTransferDetail);
                        _itemTransferDetailService.SaveChanges();
                        var responseData = Mapper.Map<StockTransferDetail, ItemTransferDetailViewModel>(itemTransferDetail);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch (Exception ex)
                    {
                    }
                }
                return response;
            });
        }
        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemTransferDetail = _itemTransferDetailService.GetAll();

                var listItemTransferDetailVm = Mapper.Map<List<ItemTransferDetailViewModel>>(listItemTransferDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemTransferDetailVm);

                return response;
            });
        }
    }
}