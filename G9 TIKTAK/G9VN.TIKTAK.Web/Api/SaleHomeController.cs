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

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/salehome")]
    [Authorize]
    public class SaleHomeController : ApiControllerBase
    {
        private ISaleHomeService _SaleHomeService;

        public SaleHomeController(IErrorService errorService, ISaleHomeService SaleHomeService) : base(errorService)
        {
            this._SaleHomeService = SaleHomeService;
        }
        //lấy ds đơn hàng với  10<=VoucherType<=14
        [Route("getall")]
        [HttpGet]
    
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleHomeService.GetByVoucherType1(10,14);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }
        //lấy ds phiếu thu với  VoucherType=2
        [Route("getall_receipt")]
        [HttpGet]
      
        public HttpResponseMessage Get1(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleHomeService.GetByVoucherType1(20,22);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //lấy ds phiếu thu với thông tin thêm
        [Route("getall_receipt1")]
        [HttpGet]

        public HttpResponseMessage Get2(HttpRequestMessage request,Guid BranchID)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleHomeService.GetAllReceipt(BranchID);

                var listSaleInvoiceVm = Mapper.Map<List<ReceiptViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //Lấy phiếu thu theo chứng từ gốc

        [Route("getbyoriginalvoucherno")]
        [HttpGet]

        public HttpResponseMessage Get2(HttpRequestMessage request,string originalvoucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleHomeService.GetByOriginalVoucherNo(originalvoucherno);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        //Lấy ds phiếu đóng gói theo chứng từ gốc

        [Route("getpackagebyoriginalvoucherno")]
        [HttpGet]

        public HttpResponseMessage Get3(HttpRequestMessage request, string originalvoucherno)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _SaleHomeService.GetPackageByOriginalVoucherNo(originalvoucherno);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]

        public HttpResponseMessage getbyid(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                //goi service
                var saleInvoice = _SaleHomeService.GetByID(id);
                //map lai kq
                var saleInvoiceVm = Mapper.Map<SaleInvoiceViewModel>(saleInvoice);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleInvoiceVm);
                return response;
            });
        }
        //Thêm đơn hàng
        [Route("getbystatusID/{id:int}")]
        [HttpGet]

        public HttpResponseMessage getbystatusID(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                //goi service
                var saleInvoice = _SaleHomeService.GetByStatusID(id);
                //map lai kq
                var saleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(saleInvoice);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleInvoiceVm);
                return response;
            });
        }
        [Route("search")]
        [HttpGet]

        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var SaleInvoice = _SaleHomeService.GetByVoucherNo(key);

                var SaleInvoiceVm = Mapper.Map<SaleInvoiceViewModel>(SaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, SaleInvoiceVm);

                return response;
            });
        }
        [Route("create")]
        [HttpPost]
  
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
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("DH", _SaleHomeService.getCode(10,14));
                    }
                    if (newSaleInvoice.VoucherDate == null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                    else
                    {
                        newSaleInvoice.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    }          

                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.VoucherID = Guid.NewGuid();
                   
                    try
                    {
                        _SaleHomeService.Add(newSaleInvoice);
                        _SaleHomeService.SaveChanges();

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
                        
                    newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("DG", _SaleHomeService.getCode(30, 31));                           
                    newSaleInvoice.VoucherDate = DateTime.Now;
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    newSaleInvoice.VoucherID = Guid.NewGuid();

                    try
                    {
                        _SaleHomeService.Add(newSaleInvoice);
                        _SaleHomeService.SaveChanges();

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
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("PT", _SaleHomeService.getCode(20,22));
                    }
                    //ngày tạo 
                    if (newSaleInvoice.VoucherDate == null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }
                 
                    //người tạo
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    //tự tạo voucherID
                    newSaleInvoice.VoucherID = Guid.NewGuid();
                    
                    try
                    {
                        _SaleHomeService.Add(newSaleInvoice);
                        _SaleHomeService.SaveChanges();

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
                    //lấy đơn hàng theo id
                    var saleinvoice = _SaleHomeService.GetByID(SaleInvoiceVm.VoucherID);
                    //điều chỉnh chênh lệch múi giờ
                    SaleInvoiceVm.VoucherDate = DateTime.Parse(SaleInvoiceVm.VoucherDate.ToString()).AddHours(7);
                    //gọi extension update 
                    saleinvoice.UpdateSaleInvoice(SaleInvoiceVm);
                    //gọi service
                    _SaleHomeService.Update(saleinvoice);
                    _SaleHomeService.SaveChanges();
                    //map lai du lieu trả về
                    var responsedata = Mapper.Map<SaleInvoice, SaleInvoiceViewModel>(saleinvoice);
                    response = request.CreateResponse(HttpStatusCode.Created, responsedata);

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
                        newSaleInvoice.VoucherNo = AutoCode.MaTuSinh("SR", _SaleHomeService.getCode(7, 7));
                    }
                    //ngày tạo 
                    if (newSaleInvoice.VoucherDate == null)
                    {
                        newSaleInvoice.VoucherDate = DateTime.Now;
                    }

                    //người tạo
                    newSaleInvoice.CreatedBy = User.Identity.Name;
                    //tự tạo voucherID
                    newSaleInvoice.VoucherID = Guid.NewGuid();

                    try
                    {
                        _SaleHomeService.Add(newSaleInvoice);
                        _SaleHomeService.SaveChanges();

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
                var listSaleInvoice = _SaleHomeService.GetByVoucherType1(7,7);

                var listSaleInvoiceVm = Mapper.Map<List<SaleInvoiceViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

       
        [Route("reportHome")]
        [HttpGet]
        public HttpResponseMessage GetReportHome(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
               
               
                DashBoardHomeViewModel dashBoardHomeViewModel = new DashBoardHomeViewModel();
                dashBoardHomeViewModel.reportHomeNewViewModel = _SaleHomeService.reportHomeNew(); 
                dashBoardHomeViewModel.listReportHomeViewModel = _SaleHomeService.reportHome();
                dashBoardHomeViewModel.listSaleInvoiceViewModel = Mapper.Map<List<SaleInvoiceViewModel>>(_SaleHomeService.GetByVoucherType1(10, 14));

                //var listSaleInvoiceVm = Mapper.Map<List<ReportHomeViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, dashBoardHomeViewModel);

                return response;
            });
        }


    }
}
