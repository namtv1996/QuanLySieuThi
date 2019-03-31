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
    [RoutePrefix("api/purchaseInvDetail")]
    [Authorize]
    public class PurchaseInvoiceDetailController : ApiControllerBase
    {
        private IPurchaseInvoiceDetailService _purchaseInvoiceDetailService;

        public PurchaseInvoiceDetailController(IErrorService errorService, IPurchaseInvoiceDetailService purchaseInvoiceDetailService) : base(errorService)
        {
            this._purchaseInvoiceDetailService = purchaseInvoiceDetailService;
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetByVoucherID(id).OrderBy(x=>x.SortOrder).ToList();

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }

        [Route("getinwardstock")]
        [HttpGet]
        public HttpResponseMessage GetInwardStock(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetInventoryTransaction(4,6);

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }

        [Route("getpurchaseinvoicedetail/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetPurchaseInvDetailByISID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetDetailByInwardStockID(id,5,4);

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }

        [Route("getPartialStorageDetail/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetPartialStorageDetailByISID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetDetailByInwardStockID(id, 8,4);

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }

        [Route("getPurchaseReturnDetailByOVN")]
        [HttpGet]
        public HttpResponseMessage GetPurchaseReturnDetailByOVN(HttpRequestMessage request, string voucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetDetailByOriginalVoucherNo(voucherno, 6,8);

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }
        [Route("getPurchaseReturnDetailByISID/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetPurchaseReturnDetailByISID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvDetail = _purchaseInvoiceDetailService.GetDetailByInwardStockID(id, 6, 4);

                var listPurchaseInvDetailVm = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(listPurchaseInvDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvDetailVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, PurchaseInvoiceDetailViewModel purchaseInvDetailVm)
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
                    PurchaseInvoiceDetail purchaseInvDetail = new PurchaseInvoiceDetail();
                    purchaseInvDetail.UpdatePurchaseInvoiceDetail(purchaseInvDetailVm);
                    purchaseInvDetail.InvDate = DateTime.Now;
                    purchaseInvDetail.VoucherDetailID = Guid.NewGuid();
                    try
                    {
                        _purchaseInvoiceDetailService.Add(purchaseInvDetail);
                        _purchaseInvoiceDetailService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoiceDetail, PurchaseInvoiceDetailViewModel>(purchaseInvDetail);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("deleteByVoucherID")]
        [HttpDelete]
        public HttpResponseMessage DeleteByVoucherID(HttpRequestMessage request, Guid id)
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

                    _purchaseInvoiceDetailService.DeleteMultiByVoucherID(id);

                    _purchaseInvoiceDetailService.SaveChanges();

                    var responseData = Mapper.Map<List<PurchaseInvoiceDetailViewModel>>(_purchaseInvoiceDetailService.GetByVoucherID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
