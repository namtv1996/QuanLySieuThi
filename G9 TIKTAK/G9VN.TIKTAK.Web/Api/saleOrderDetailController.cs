using AutoMapper;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/saleOrderDetail")]
    [Authorize]
    public class SaleOrderDetailController : ApiControllerBase
    {
        private ISaleInvoiceDetailService _SaleInvoiceDetailService;

        public SaleOrderDetailController(IErrorService errorService, ISaleInvoiceDetailService SaleInvoiceDetailService) : base(errorService)
        {
            this._SaleInvoiceDetailService = SaleInvoiceDetailService;
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoiceDetail = _SaleInvoiceDetailService.GetByVoucherID(id);

                var listSaleInvoiceDetailVm = Mapper.Map<List<SaleInvoiceDetailViewModel>>(listSaleInvoiceDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceDetailVm);

                return response;
            });
        }

        [Route("getSaleReturnDetailByOVN")]
        [HttpGet]
        public HttpResponseMessage GetSaleReturnDetailByOVN(HttpRequestMessage request, string originalVoucherNo)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoiceDetail = _SaleInvoiceDetailService.GetDetailByOriginalVoucherNo(originalVoucherNo,7);

                var listSaleInvoiceDetailVm = Mapper.Map<List<SaleInvoiceDetailViewModel>>(listSaleInvoiceDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceDetailVm);

                return response;
            });
        }

        [Route("inventorytransaction")]
        [HttpGet]
        public HttpResponseMessage GetInventoryTransaction(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoiceDetail = _SaleInvoiceDetailService.GetInventoryTransaction();

                var listSaleInvoiceDetailVm = Mapper.Map<List<SaleInvoiceDetailViewModel>>(listSaleInvoiceDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceDetailVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Create(HttpRequestMessage request, SaleInvoiceDetailViewModel SaleInvoiceDetailVm)
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
                    SaleInvoiceDetail newSaleInvoiceDetail = new SaleInvoiceDetail();
                    newSaleInvoiceDetail.UpdateSaleInvoiceDetail(SaleInvoiceDetailVm);
                    newSaleInvoiceDetail.InvDate = DateTime.Now;
                    newSaleInvoiceDetail.VoucherDetailID = Guid.NewGuid();
                    try
                    {
                        _SaleInvoiceDetailService.Add(newSaleInvoiceDetail);
                        _SaleInvoiceDetailService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoiceDetail, SaleInvoiceDetailViewModel>(newSaleInvoiceDetail);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
                return response;
            });
        }

        [Route("createSaleReturnDetail")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreateSaleReturnDetail(HttpRequestMessage request, SaleInvoiceDetailViewModel SaleInvoiceDetailVm)
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
                    SaleInvoiceDetail newSaleInvoiceDetail = new SaleInvoiceDetail();
                    newSaleInvoiceDetail.UpdateSaleInvoiceDetail(SaleInvoiceDetailVm);
                    newSaleInvoiceDetail.InvDate = DateTime.Now;
                    newSaleInvoiceDetail.VoucherDetailID = Guid.NewGuid();
                    try
                    {
                        _SaleInvoiceDetailService.Add(newSaleInvoiceDetail);
                        _SaleInvoiceDetailService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoiceDetail, SaleInvoiceDetailViewModel>(newSaleInvoiceDetail);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
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
                    _SaleInvoiceDetailService.DeleteByVoucherId(id);
                    _SaleInvoiceDetailService.SaveChanges();

                    var responseData = Mapper.Map<SaleInvoiceDetail, SaleInvoiceDetailViewModel>(_SaleInvoiceDetailService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

    }
}
