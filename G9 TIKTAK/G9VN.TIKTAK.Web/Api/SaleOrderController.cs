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
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/saleOrder")]
    [Authorize]
    public class SaleOrderController : ApiControllerBase
    {
        private ISaleInvoiceService _SaleInvoiceService;

        public SaleOrderController(IErrorService errorService, ISaleInvoiceService SaleInvoiceService) : base(errorService)
        {
            this._SaleInvoiceService = SaleInvoiceService;
        }
        //lấy ds đơn hàng với  10<=VoucherType<=14
        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetByVoucherType1(10,14);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }
        //Lấy ds đơn hàng theo chi nhánh
        [Route("SelectSaleOrderByBranchID")]
        [HttpGet]
        [Authorize(Roles ="SaleOrder_View")]
        public HttpResponseMessage Get2(HttpRequestMessage request,Guid BranchID)
        {
            return CreateHttpResponse(request, () => {

                var listSaleOrder = _SaleInvoiceService.SelectSaleOrderByBranchID(BranchID);
                var listSaleOrderVM = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleOrder);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleOrderVM);
                return response;
            });
        }
        [Route("SelectSaleOrder10ByBranchID")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage Get3(HttpRequestMessage request, Guid BranchID)
        {
            return CreateHttpResponse(request, () => {

                var listSaleOrder = _SaleInvoiceService.SelectSaleOrder10ByBranchID(BranchID);
                var listSaleOrderVM = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleOrder);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleOrderVM);
                return response;
            });
        }
        [Route("SelectSaleOrderByObject")]
        [HttpGet]
        public HttpResponseMessage get(HttpRequestMessage request, Guid ObjectID)
        {
            return CreateHttpResponse(request, () => {

                var listSaleOrder = _SaleInvoiceService.SelectSaleOrderObject(ObjectID);
                var listSaleOrderObjectVM = Mapper.Map<List<SP_SelectSaleOrderByObjectViewModel>>(listSaleOrder);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleOrderObjectVM);
                return response;
            });
        }
        [Route("SelectSaleOrder12ByBranchID")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage Get4(HttpRequestMessage request, Guid BranchID)
        {
            return CreateHttpResponse(request, () => {

                var listSaleOrder = _SaleInvoiceService.SelectSaleOrder12ByBranchID(BranchID);
                var listSaleOrderVM = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleOrder);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleOrderVM);
                return response;
            });
        }
        [Route("getSaleInvoiceByItemoptionID")]
        [HttpGet]
        [Authorize(Roles ="SaleOrder_View")]
        public HttpResponseMessage getSaleInvoiceByItemoptionID(HttpRequestMessage request,Guid? ItemOptionID,int number)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoiceVm = _SaleInvoiceService.GetSaleInvoiceByItemOptionID(ItemOptionID, number);
                var listSaleOrderVM = Mapper.Map<List<SaleInvoice1ViewModel>>(listSaleInvoiceVm);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleOrderVM);
                return response;
            });
        }

        [Route("getSaleOrderByObjectID")]
        [HttpGet]
        public HttpResponseMessage GetSaleOrderByObjectID(HttpRequestMessage request, Guid object_id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetSaleInvoiceByObjectID(10, 14, object_id);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //lấy ds phiếu thu với  VoucherType=2
        [Route("getall_receipt")]
        [HttpGet]
        [Authorize(Roles = "Receipt_View")]
        public HttpResponseMessage Get1(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetByVoucherType1(20,22);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //lấy đơn trả hàng theo chứng từ gốc
        [Route("getSaleReturnBySaleOrderVoucherNo")]
        [HttpGet]
        public HttpResponseMessage GetSaleReturnBySaleOrderVoucherNo(HttpRequestMessage request, string saleOrderVoucherNo)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetVoucherBySaleOrderVoucherNo(saleOrderVoucherNo,7,7);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //lấy ds phiếu thu với thông tin thêm
        [Route("getall_receipt1")]
        [HttpGet]
        [Authorize(Roles = "Receipt_View")]
        public HttpResponseMessage Get5(HttpRequestMessage request,Guid BranchID)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetAllReceipt(BranchID);

                var listSaleInvoiceVm = Mapper.Map<List<ReceiptViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //Lấy phiếu thu theo chứng từ gốc

        [Route("getbyoriginalvoucherno")]
        [HttpGet]
        [Authorize(Roles = "Receipt_View")]
        public HttpResponseMessage Get2(HttpRequestMessage request,string originalvoucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetByOriginalVoucherNo(originalvoucherno);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //Lấy ds phiếu đóng gói theo chứng từ gốc

        [Route("getpackagebyoriginalvoucherno")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage Get3(HttpRequestMessage request, string originalvoucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetPackageByOriginalVoucherNo(originalvoucherno);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage getbyid(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                //goi service
                var saleInvoice = _SaleInvoiceService.GetByID(id);
                //map lai kq
                var saleInvoiceVm = Mapper.Map<SaleInvoiceViewModel>(saleInvoice);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleInvoiceVm);
                return response;
            });
        }
        //Thêm đơn hàng
        [Route("getbystatusID/{id:int}")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage getbystatusID(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                //goi service
                var saleInvoice = _SaleInvoiceService.GetByStatusID(id);
                //map lai kq
                var saleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(saleInvoice);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleInvoiceVm);
                return response;
            });
        }
        [Route("getbypromotionid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage getbyPromotionID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                //goi service
                var saleInvoice = _SaleInvoiceService.GetbyPromotionID(id);
                //map lai kq
                var saleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(saleInvoice);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleInvoiceVm);
                return response;
            });
        }
        [Route("search")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var SaleInvoice = _SaleInvoiceService.GetByVoucherNo(key);

                var SaleInvoiceVm = Mapper.Map<SaleInvoiceViewModel>(SaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, SaleInvoiceVm);

                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "SaleOrder_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
                    SaleInvoice newSaleInvoice = new SaleInvoice();
                  
                    newSaleInvoice.UpdateSaleInvoice(SaleInvoiceVm);
                    if (newSaleInvoice.VoucherNo == null)
                    {
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("DH", _SaleInvoiceService.getCode(10,14));
                    }                
                    if (newSaleInvoice.VoucherDate != null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                        //newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).ToLocalTime();
                    }
                    else {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                    //ngày tạo
                    newSaleInvoice.InvDate = DateTime.Now;
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.Employee = User.Identity.Name;
                    newSaleInvoice.VoucherID = Guid.NewGuid();
                   
                    try
                    {
                        _SaleInvoiceService.Add(newSaleInvoice);
                        _SaleInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(newSaleInvoice);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }
        //thêm phiếu đóng gói
        [Route("create_package")]
        [HttpPost]
        public HttpResponseMessage Create_Package(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
                    SaleInvoice newSaleInvoice = new SaleInvoice();
                    newSaleInvoice.UpdateSaleInvoice(SaleInvoiceVm);
                        
                    newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("DG", _SaleInvoiceService.getCode(30, 31));
                    if (newSaleInvoice.VoucherDate != null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    }
                    else
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                    //ngày tạo
                    newSaleInvoice.InvDate = DateTime.Now;
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.VoucherID = Guid.NewGuid();

                    try
                    {
                        _SaleInvoiceService.Add(newSaleInvoice);
                        _SaleInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(newSaleInvoice);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }
        //thêm phiếu thu tiền
        [Route("create_receipt")]
        [HttpPost]
        public HttpResponseMessage Create1(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
                    SaleInvoice newSaleInvoice = new SaleInvoice();
                    newSaleInvoice.UpdateSaleInvoice(SaleInvoiceVm);
                    // mã phiếu thu
                    if (newSaleInvoice.VoucherNo == null)
                    {
                        //2  - phiếu thu
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("PT", _SaleInvoiceService.getCode(20,22));
                    }
                    if (newSaleInvoice.VoucherDate != null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    }
                    else
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                    //ngày tạo
                    newSaleInvoice.InvDate = DateTime.Now;

                    //người tạo
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.Employee = User.Identity.Name;
                    //tự tạo voucherID
                    newSaleInvoice.VoucherID = Guid.NewGuid();
                    
                    try
                    {
                        _SaleInvoiceService.Add(newSaleInvoice);
                        _SaleInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(newSaleInvoice);
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
        [Authorize(Roles = "SaleOrder_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
               
                    var saleinvoice = _SaleInvoiceService.GetByID(SaleInvoiceVm.VoucherID);
                    if (SaleInvoiceVm.VoucherDate != null)
                    {
                        SaleInvoiceVm.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);                                            
                    }
                    if (SaleInvoiceVm.InvDate != null)
                    {
                        SaleInvoiceVm.InvDate = DateTime.Parse(SaleInvoiceVm.InvDate.ToString()).AddHours(7);
                    }
                    saleinvoice.UpdateSaleInvoice(SaleInvoiceVm);
                    
                    _SaleInvoiceService.Update(saleinvoice);
                    _SaleInvoiceService.SaveChanges();
             
                    var responsedata = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(saleinvoice);
                    response = request.CreateResponse(HttpStatusCode.Created, responsedata);

                }
                return response;
            });
        }
       
        [Route("UpdateInventory")]
        [HttpPut]
        [Authorize(Roles = "SaleOrder_Update")]
        public HttpResponseMessage UpdateInventory(HttpRequestMessage request, UpdateInventoryParam param)
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

                    _SaleInvoiceService.UpdateInventory(param);
                    _SaleInvoiceService.SaveChanges();
                 
                }
                return response;
            });
        }

        //đơn trả hàng
        [Route("createSaleReturn")]
        [HttpPost]
        public HttpResponseMessage CreateSaleReturn(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
                    SaleInvoice newSaleInvoice = new SaleInvoice();
                    newSaleInvoice.UpdateSaleInvoice(SaleInvoiceVm);
                    // mã phiếu thu
                    if (newSaleInvoice.VoucherNo == null)
                    {
                        //2  - phiếu thu
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("SR", _SaleInvoiceService.getCode(7, 7));
                    }
                    if (newSaleInvoice.VoucherDate != null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    }
                    else
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                    //ngày tạo
                    newSaleInvoice.InvDate = DateTime.Now;

                    //người tạo
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    //tự tạo voucherID
                    newSaleInvoice.VoucherID = Guid.NewGuid();

                    try
                    {
                        _SaleInvoiceService.Add(newSaleInvoice);
                        _SaleInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(newSaleInvoice);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("getSaleReturn")]
        [HttpGet]
        public HttpResponseMessage GetSaleReturn(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetByVoucherType1(7,7);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //getcode
        [Route("getCode")]
        [HttpGet]
        public HttpResponseMessage GetCode(HttpRequestMessage request, string parentID, int vouchertype1, int vouchertype2)
        {
            return CreateHttpResponse(request, () =>
            {
                string code = AutoCode.MaTuSinh(parentID, _SaleInvoiceService.getCode(vouchertype1, vouchertype2));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, code);
                return response;
            });
        }


        //báo cáo
       

        [Route("reportHome")]
        [HttpGet]
        public HttpResponseMessage GetReportHome(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.reportHome();

                var listSaleInvoiceVm = Mapper.Map<List<ReportHomeViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        // giao hàng
        [Route("create_delivery")]
        [HttpPost]
        public HttpResponseMessage CreateDeliveryVoucher(HttpRequestMessage request, SaleInvoiceViewModel SaleInvoiceVm)
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
                    SaleInvoice newSaleInvoice = new SaleInvoice();
                    newSaleInvoice.UpdateSaleInvoice(SaleInvoiceVm);
                   
                    if (newSaleInvoice.VoucherNo == null)
                    {                    
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("GH", _SaleInvoiceService.getCode(50, 50));
                    }
                    if (newSaleInvoice.VoucherDate != null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    }
                    //ngày tạo
                    newSaleInvoice.InvDate = DateTime.Now;


                    newSaleInvoice.VoucherType = 50;
                   
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.Employee = User.Identity.Name;
               
                    newSaleInvoice.VoucherID = Guid.NewGuid();

                    try
                    {
                        _SaleInvoiceService.Add(newSaleInvoice);
                        _SaleInvoiceService.SaveChanges();

                        var responseData = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(newSaleInvoice);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("getalldelivery")]
        [HttpGet]
        public HttpResponseMessage GetAllDeliveryOrder(HttpRequestMessage request, Guid? BranchID)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetAllDeliveryOrder(BranchID);

                var listSaleInvoiceVm = Mapper.Map<List<DeliveryOrderViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("getDeliveryVoucherById/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage getDeliveryVoucherById(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetDeliveryOrderById(id);

                var listSaleInvoiceVm = Mapper.Map<DeliveryOrderViewModel>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("getDeliveryOrderByPackageVoucherNo")]
        [HttpGet]
        public HttpResponseMessage getDeliveryOrderByPackageVoucherNo(HttpRequestMessage request, string packageVoucherNo)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleInvoiceService.GetVoucherBySaleOrderVoucherNo(packageVoucherNo, 50, 50);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

    }
}
