using G9VN.TIKTAK.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using G9VN.TIKTAK.Service;
using System.Web.Http;
using System.Net.Http;
using AutoMapper;
using G9VN.TIKTAK.Web.Models;
using System.Net;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Common.ViewsModel;
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/stock")]
    [Authorize]
    public class StockController : ApiControllerBase
    {
        private IStockService _stockService;
        public StockController(IErrorService errorService, IStockService _stockService) : base(errorService)
        {
            this._stockService = _stockService;
        }
        [Route("getAll")]
        [HttpGet]
        public HttpResponseMessage getAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listStock = _stockService.GetAll();
                var listStockVM = Mapper.Map<List<StockViewModel>>(listStock);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listStockVM);
                return response;
            });
        }
        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<Stock> item)
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
                        data.StockID = Guid.NewGuid();
                        _stockService.SaveChanges();
                        _stockService.Add(data);
                        _stockService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<StockViewModel>>(item);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }
        [Route("updateQuantity")]
        [HttpPut]
        public HttpResponseMessage updateQuantity(HttpRequestMessage resquest, StockViewModel stockVM)
        {
            return CreateHttpResponse(resquest, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = resquest.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var bra = _stockService.getByBranchIDItemOptionID(stockVM.BranchID, stockVM.ItemOptionID);
                    bra.Quantity = stockVM.Quantity;
                    //goi phuong thuc update

                    _stockService.Update(bra);
                    _stockService.SaveChanges();
                  
                    var responseData = Mapper.Map<Stock, StockViewModel>(bra);
                    response = Request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;

            });
        }

        [Route("getStockDetail/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage GetStockDetail1(HttpRequestMessage request,Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var stockDetail = _stockService.getStockDetail(id);
                var stockDetailVM = Mapper.Map<List<StockInventoryDetail>>(stockDetail);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, stockDetailVM);
                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, List<StockViewModel> stockVM)
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
                    for (int i = 0; i < stockVM.Count(); i++)
                    {
                        Stock stocknew = new Stock();
                        stocknew.BranchID = stockVM[i].BranchID;
                        stocknew.StockID = Guid.NewGuid();
                        stocknew.ItemOptionID = stockVM[i].ItemOptionID;
                        //tồn kho hiện tại của tùy chọn theo kho
                        stocknew.Quantity = stockVM[i].Quantity;
                        //tồn kho ban đầu của tùy chọn theo kho - không thể thay đổi
                        stocknew.InitialInventory = stockVM[i].InitialInventory;
                        try
                        {
                            _stockService.Add(stocknew);
                            _stockService.SaveChanges();
                            //mapping
                            //var responseData = Mapper.Map<Stock, StockViewModel>(stocknew);
                            //response = request.CreateResponse(HttpStatusCode.Created, responseData);
                        }
                        catch
                        {
                        }
                    }
                }
                return response;
            });
        }

        //cập nhật tồn theo chi nhánh khi bán pos
        [Route("update")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage update(HttpRequestMessage resquest, StockViewModel stockVM)
        {
            return CreateHttpResponse(resquest, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = resquest.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var bra = _stockService.getByBranchIDItemOptionID(stockVM.BranchID,stockVM.ItemOptionID);
                    bra.Quantity = bra.Quantity - stockVM.Quantity;
                    //goi phuong thuc update

                    _stockService.Update(bra);
                    _stockService.SaveChanges();
                    //map tu kieu Branch sang BranchViewModel
                    var responseData = Mapper.Map<Stock, StockViewModel>(bra);
                    response = Request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;

            });

        }

       
        [Route("getbyid/{id:Guid}")]
        [HttpGet]       
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var stock = _stockService.GetByID(id);

                var stockVM = Mapper.Map<StockViewModel>(stock);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, stockVM);

                return response;
            });
        }
        [Route("deleteByItemoptionID/{ItemoptionID:Guid}")]
        [HttpDelete]
        [Authorize(Roles ="Item_Update")]
        public HttpResponseMessage deleteItemOptionID(HttpRequestMessage request,Guid ItemOptionID)
        {
            return CreateHttpResponse(request, () => {
                _stockService.deleteByItemOptionID(ItemOptionID);
                _stockService.SaveChanges();
                return request.CreateResponse(HttpStatusCode.OK);
            })
;        }

        [Route("updateClosingQuantity")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantityWhenImportItem(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantityWhenImportItem(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }

        [Route("updateClosingQuantitySaleReturn")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantitySaleReturn(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantitySaleReturn(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }

        [Route("updateClosingQuantityPurchaseReturn")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantityPurchaseReturn(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantityPurchaseReturn(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }
        [Route("updateClosingQuantityStockTransferOut")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantityStockTransfer(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantityStockTransferOut(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }
        [Route("updateClosingQuantityStockTransferIn")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantityStockTransferIn(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantityStockTransferIn(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }

        [Route("updateClosingQuantityStockCombo")]
        [HttpPut]
        public HttpResponseMessage UpdateClosingQuantityStockCombo(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _stockService.UpdateClosingQuantityStockCombo(param);
                    _stockService.SaveChanges();

                    response = request.CreateResponse(HttpStatusCode.OK, ModelState);

                }
                return response;
            });
        }

        //[Route("updateInventoryForVoucherCheck")]
        //[HttpPut]
        //public HttpResponseMessage updateInventoryForVoucherCheck(HttpRequestMessage request, UpdateInventoryParam param)
        //{
        //    return CreateHttpResponse(request, () =>
        //    {
        //        HttpResponseMessage response = null;
        //        if (!ModelState.IsValid)
        //        {

        //            response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //        }
        //        else
        //        {

        //            _stockService.UpdateInventoryForVoucherCheck(param);
        //            _stockService.SaveChanges();

        //            response = request.CreateResponse(HttpStatusCode.OK, ModelState);

        //        }
        //        return response;
        //    });
        //}
    }
}