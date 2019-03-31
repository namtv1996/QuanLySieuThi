using AutoMapper;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/report")]
    [Authorize]
    public class ReportsController : ApiControllerBase
    {
        private IReportsService _reportService;

        public ReportsController(IErrorService errorService, IReportsService reportService) : base(errorService)
        {
            this._reportService = reportService;
        }
        //báo cáo sổ quỹ
        [Route("reportCashBook")]
        [Authorize(Roles ="View_Report")]
        [HttpGet]
        public HttpResponseMessage GetReportCashBook(HttpRequestMessage request, Guid BranchID, DateTime date1, DateTime date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCashBook = _reportService.ReportCashBook(BranchID, date1, date2);

                var listCashBookVm = Mapper.Map<List<CashBookViewModel>>(listCashBook);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCashBookVm);

                return response;
            });
        }
        [Route("reportCashBook1")]
        [Authorize(Roles = "View_Report")]
        [HttpGet]
        public HttpResponseMessage GetReportCashBook1(HttpRequestMessage request, Guid BranchID, DateTime date1, DateTime date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCashBook = _reportService.ReportCashBook1(BranchID, date1, date2);

                var listCashBookVm = Mapper.Map<G9VN.TIKTAK.Common.ViewsModel.CashBook1ViewModel>(listCashBook);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCashBookVm);

                return response;
            });
        }
        //báo cáo lãi lỗ
        [Route("ReportProfitAndLoss")]
        [HttpGet]
        [Authorize(Roles ="View_Report")]
        public HttpResponseMessage ReportProfitAndLoss(HttpRequestMessage request,Guid BranchID,DateTime date1, DateTime date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCashBookVm = _reportService.ReportProfitAndLoss(BranchID,date1,date2);
               
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCashBookVm);

                return response;
            });
        }
        // báo cáo xuất nhập tồn
        [Route("ReportImportExport")]
        [HttpGet]
        [Authorize(Roles ="View_Report")]
        public HttpResponseMessage ReportImportExport(HttpRequestMessage request, Guid BranchID, DateTime date1, DateTime date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVm = _reportService.ReportImportExport(BranchID, date1, date2);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVm);

                return response;
            });
        }
        [Route("reportTransactionStock")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportTransactionStock(HttpRequestMessage request, Guid branchid, DateTime? date1, DateTime? date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _reportService.ReportTransactionStock(branchid, date1, date2);

                var listSaleInvoiceVm = Mapper.Map<List<TransactionStockViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }
    }
}
