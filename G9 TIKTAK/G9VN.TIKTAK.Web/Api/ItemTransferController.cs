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
    [RoutePrefix("api/itemTransfer")]
    public class ItemTransferController : ApiControllerBase
    {
        private IItemTransferService _itemTransferService;
        public ItemTransferController(IErrorService errorService, IItemTransferService itemTransferService) : base(errorService)
        {
            this._itemTransferService = itemTransferService;
        }
        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var ItemTransfer = _itemTransferService.GetByID(id);

                var ItemTransferVm = Mapper.Map<ItemTransferViewModel>(ItemTransfer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemTransferVm);

                return response;
            });
        }
        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemTransfer = _itemTransferService.GetAll();

                var listItemTransferVm = Mapper.Map<List<ItemTransferViewModel>>(listItemTransfer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemTransferVm);

                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ItemTransferViewModel itemTransferVm)
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
                    StockTransfer itemTransfer = new StockTransfer();
                    itemTransfer.UpdateItemTransfer(itemTransferVm);
                    if (itemTransferVm.VoucherNo == null || itemTransferVm.VoucherNo == "")
                    {
                        string pch = AutoCode.MaTuSinh("PCH", _itemTransferService.getCode("PCH"));
                        itemTransfer.VoucherNo = pch;
                    }
                    itemTransfer.VoucherDate = DateTime.Now;
                    itemTransfer.CreatedBy = User.Identity.Name;
                    itemTransfer.VoucherID = Guid.NewGuid();
                    itemTransfer.VoucherType = 43;
                    try
                    {
                        _itemTransferService.Add(itemTransfer);
                        _itemTransferService.SaveChanges();
                        var responseData = Mapper.Map<StockTransfer, ItemTransferViewModel>(itemTransfer);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }
        [Route("createStockIn")]
        [HttpPost]
        public HttpResponseMessage createStockIn(HttpRequestMessage request, ItemTransferViewModel itemTransferVm)
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
                    StockTransfer itemTransfer = new StockTransfer();
                    itemTransfer.UpdateItemTransfer(itemTransferVm);
                    if (itemTransferVm.VoucherNo == null || itemTransferVm.VoucherNo == "")
                    {
                        string pnh = AutoCode.MaTuSinh("PNH", _itemTransferService.getCode("PNH"));
                        itemTransfer.VoucherNo = pnh;
                    }
                    itemTransfer.VoucherDate = DateTime.Now;
                    itemTransfer.CreatedBy = User.Identity.Name;
                    itemTransfer.VoucherID = Guid.NewGuid();
                    itemTransfer.VoucherType = 44;
                    try
                    {
                        _itemTransferService.Add(itemTransfer);
                        _itemTransferService.SaveChanges();
                        var responseData = Mapper.Map<StockTransfer, ItemTransferViewModel>(itemTransfer);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }
        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, ItemTransferViewModel stockTransferVm)
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
                    var stockTransfer = _itemTransferService.GetByID(stockTransferVm.VoucherID);

                    stockTransfer.UpdateItemTransfer(stockTransferVm);


                    _itemTransferService.Update(stockTransfer);
                    _itemTransferService.SaveChanges();

                    var responseData = Mapper.Map<StockTransfer, ItemTransferViewModel>(stockTransfer);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);

                }

                return response;
            });
        }

        [Route("getCode")]
        [HttpGet]
        public HttpResponseMessage get(HttpRequestMessage request, string parentID)
        {
            return CreateHttpResponse(request, () =>
            {
                string mats = AutoCode.MaTuSinh("PCH", _itemTransferService.getCode(parentID));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, mats);
                return response;
            });
        }
        [Route("delete")]
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, Guid id)
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
                    _itemTransferService.Delete(id);
                    _itemTransferService.SaveChanges();

                    var responseData = Mapper.Map<StockTransfer, ItemTransferViewModel>(_itemTransferService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
        [Route("getbyvoucherid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByVoucherID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
              {
                  var ItemTransfer = _itemTransferService.GetByVoucherID(id);

                  var ItemTransferVm = Mapper.Map<ItemTransferViewModel>(ItemTransfer);

                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemTransferVm);

                  return response;
              });
        }
    }
}