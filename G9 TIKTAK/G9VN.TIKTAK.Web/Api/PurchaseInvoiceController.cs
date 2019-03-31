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
    [RoutePrefix("api/purchaseInvoice")]
    public class PurchaseInvoiceController : ApiControllerBase
    {
        private IPurchaseInvoiceService _purchaseInvoiceService;

        public PurchaseInvoiceController(IErrorService errorService, IPurchaseInvoiceService purchaseInvoiceService) : base(errorService)
        {
            this._purchaseInvoiceService = purchaseInvoiceService;
        }

        //phiếu nhập
        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByVoucherType(4).OrderByDescending(x=>x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getbyObjectID")]
        [HttpGet]
        public HttpResponseMessage GetByObjectID(HttpRequestMessage request,Guid object_id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetPurchaseInvoiceByObjectID(4, object_id).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("deleteInwardStock")]
        [HttpDelete]
        public HttpResponseMessage DeleteInwardStock(HttpRequestMessage request, Guid id)
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

                    _purchaseInvoiceService.DeleteInwardStock(id);

                    _purchaseInvoiceService.SaveChanges();

                    var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(_purchaseInvoiceService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("getbystatus")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetByStatus(HttpRequestMessage request, int status)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByStatus(4,status).OrderByDescending(x=>x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getPartialStorageByInwardStock/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPartialStorageByInwardStockID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByInwardStockID(8, id).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getPurchaseReturnByPartialStorage")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseReturnByPartialStorage(HttpRequestMessage request, string voucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByOriginalVoucherNo(6, voucherno).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getPurchaseInvoiceBySaleReturn")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseInvoiceBySaleReturn(HttpRequestMessage request, string sr_voucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetPurchaseInvoiceBySaleReturn(sr_voucherno).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getPurchaseReturnByISID/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseReturnByISID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByInwardStockID(6, id).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Create(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice purchase = new PurchaseInvoice();
                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchaseVm.INVoucherNo == null || purchaseVm.INVoucherNo == "")
                    {
                        purchase.INVoucherNo = AutoCode.MaTuSinh("NH", _purchaseInvoiceService.getCode(4, 4));
                    }                   
                    if (purchaseVm.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = User.Identity.Name;
                    purchase.InvoiceExportStatus = 0;
                    purchase.StockImportStatus = 0;
                    purchase.PaymentStatus = 0;
                    purchase.VoucherID = Guid.NewGuid();
                    purchase.VoucherType = 4;
                    try
                    {
                        _purchaseInvoiceService.Add(purchase);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        //tạo phiếu nhập hàng bán trả lại
        [Route("createVoucherReceiveItemReturn")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreateVoucherReceiveItemReturn(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice purchase = new PurchaseInvoice();
                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchaseVm.INVoucherNo == null || purchaseVm.INVoucherNo == "")
                    {
                        purchase.INVoucherNo = AutoCode.MaTuSinh("PN", _purchaseInvoiceService.getCode(9, 9));
                    }
                    if (purchaseVm.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = User.Identity.Name;
                    purchase.InvoiceExportStatus = 0;
                    purchase.StockImportStatus = 0;
                    purchase.PaymentStatus = 0;
                    purchase.VoucherID = Guid.NewGuid();
                    purchase.VoucherType = 9;
                    try
                    {
                        _purchaseInvoiceService.Add(purchase);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("createPartialStorage")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreatePartialStorage(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice purchase = new PurchaseInvoice();
                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchaseVm.INVoucherNo == null || purchaseVm.INVoucherNo == "")
                    {
                        purchase.INVoucherNo = AutoCode.MaTuSinh("PS", _purchaseInvoiceService.getCode(8, 8));
                    }
                    if (purchaseVm.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = User.Identity.Name;
                    purchase.InvoiceExportStatus = 0;
                    purchase.StockImportStatus = 0;
                    purchase.PaymentStatus = 0;
                    purchase.VoucherID = Guid.NewGuid();
                    purchase.VoucherType = 8;
                    try
                    {
                        _purchaseInvoiceService.Add(purchase);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        //hóa đơn nhập
        [Route("getpurchaseinvoice")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseInvoice(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByVoucherType(5).OrderByDescending(x=>x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getInvoiceByInwardStock/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetInvoiceByInwardStockID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByInwardStockID(5, id).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }       

        [Route("createInv")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreateInvoice(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice purchase = new PurchaseInvoice();
                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchaseVm.INVoucherNo == null || purchaseVm.INVoucherNo == "")
                    {
                        purchase.INVoucherNo = AutoCode.MaTuSinh("HD", _purchaseInvoiceService.getCode(5, 5));
                    }
                    if (purchaseVm.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = User.Identity.Name;
                    purchase.PaymentStatus = 0;
                    purchase.VoucherID = Guid.NewGuid();
                    purchase.VoucherType = 5;
                    try
                    {
                        _purchaseInvoiceService.Add(purchase);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }


        //đơn trả hàng
        [Route("getPurchaseReturn")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseReturn(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByVoucherType(6).OrderByDescending(x=>x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("createPurchaseReturn")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreatePurchaseReturn(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice purchase = new PurchaseInvoice();
                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchaseVm.INVoucherNo == null|| purchaseVm.INVoucherNo == "")
                    {
                        purchase.INVoucherNo = AutoCode.MaTuSinh("PR", _purchaseInvoiceService.getCode(6, 6));
                    }
                    if (purchaseVm.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }
                    purchase.CreatedDate = DateTime.Now;
                    purchase.CreatedBy = User.Identity.Name;
                    purchase.PaymentStatus = 0;
                    purchase.VoucherID = Guid.NewGuid();
                    purchase.VoucherType = 6;
                    try
                    {
                        _purchaseInvoiceService.Add(purchase);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("getPurchaseReturnByISIDAndStt/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetPurchaseReturnByISIDAndStt(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByInwardStockIdAndStatus(6, id,1).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        //phiếu chi
        [Route("getCashPayment")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetCashPayment(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByVoucherType1(40,42).OrderByDescending(x=>x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getCashPaymentByInwardStock/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetCashPaymentByInwardStockID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetByInwardStockID(40, id).OrderByDescending(x => x.CreatedDate).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("getVoucherByInwardStockID")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage getVoucherByInwardStockID(HttpRequestMessage request, int vouchertype1, int vouchertype2, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPurchaseInvoice = _purchaseInvoiceService.GetVoucherByInwardStockID(vouchertype1, vouchertype2, id).ToList();

                var listPurchaseInvoiceVm = Mapper.Map<List<PurchaseInvoiceViewModel>>(listPurchaseInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPurchaseInvoiceVm);

                return response;
            });
        }

        [Route("createCashPayment")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage CreateCashPayment(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    PurchaseInvoice castPayment = new PurchaseInvoice();
                    castPayment.UpdatePurchaseInvoice(purchaseVm);
                    castPayment.CreatedDate = DateTime.Now;
                    castPayment.CreatedBy = User.Identity.Name;
                    if (purchaseVm.INVoucherNo == null|| purchaseVm.INVoucherNo == "")
                    {
                        castPayment.INVoucherNo = AutoCode.MaTuSinh("PC", _purchaseInvoiceService.getCode(40,42));
                    }
                    castPayment.VoucherID = Guid.NewGuid();
                    if (purchaseVm.INVoucherDate != null)
                    {
                        castPayment.INVoucherDate = DateTime.Parse(purchaseVm.INVoucherDate.ToString()).AddHours(7);
                    }

                    try
                    {
                        _purchaseInvoiceService.Add(castPayment);
                        _purchaseInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(castPayment);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch(Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }
                return response;
            });
        }


        // ....
        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var purchase = _purchaseInvoiceService.GetByID(id);

                var purchaseVm = Mapper.Map<PurchaseInvoiceViewModel>(purchase);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, purchaseVm);

                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, PurchaseInvoiceViewModel purchaseVm)
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
                    var purchase = _purchaseInvoiceService.GetByID(purchaseVm.VoucherID);

                    purchase.UpdatePurchaseInvoice(purchaseVm);
                    if (purchase.INVoucherDate != null)
                    {
                        purchase.INVoucherDate = DateTime.Parse(purchase.INVoucherDate.ToString()).AddHours(7);
                    }
                    if (purchase.CreatedDate != null)
                    {
                        purchase.CreatedDate = DateTime.Parse(purchase.CreatedDate.ToString()).AddHours(7);
                    }
                    purchase.ModifyDate = DateTime.Now;
                    purchase.ModifiedBy = User.Identity.Name;
                    _purchaseInvoiceService.Update(purchase);
                    _purchaseInvoiceService.SaveChanges();

                    var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(purchase);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
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
                  
                    _purchaseInvoiceService.Delete(id);
                   
                    _purchaseInvoiceService.SaveChanges();

                    var responseData = Mapper.Map<PurchaseInvoice, PurchaseInvoiceViewModel>(_purchaseInvoiceService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }   

                return response;
            });
        }

        [Route("getCode")]
        [HttpGet]
        public HttpResponseMessage GetCode(HttpRequestMessage request, string parentID, int vouchertype1, int vouchertype2)
        {
            return CreateHttpResponse(request, () =>
            {
                string code = AutoCode.MaTuSinh(parentID, _purchaseInvoiceService.getCode(vouchertype1, vouchertype2));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, code);
                return response;
            });
        }


    }
}
