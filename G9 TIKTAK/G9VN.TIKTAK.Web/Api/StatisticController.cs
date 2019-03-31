using G9VN.TIKTAK.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using G9VN.TIKTAK.Service;
using AutoMapper;
using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Web.Models;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/statistic")]
    [Authorize]
    public class StatisticController : ApiControllerBase
    {
        IStatisticService _statisticService;
        
        public StatisticController(IErrorService errorService, IStatisticService statisticService) : base(errorService)
        {
            _statisticService = statisticService;
        }

        //báo cáo bán hàng
        [Route("getbyenddaystatistic")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetByEndDayStatistic(HttpRequestMessage request, Guid branchid, DateTime? voucherdate1, DateTime? voucherdate2)
        {

            return CreateHttpResponse(request, () =>
            {
                var model = _statisticService.GetByEndDayStatistic(branchid, voucherdate1, voucherdate2);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("getSaleOrderByStatus")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetSaleOrderByStatus(HttpRequestMessage request, Guid branchid, int status, DateTime? voucherdate1, DateTime? voucherdate2)
        {

            return CreateHttpResponse(request, () =>
            {            
                var model = _statisticService.GetSaleInvoiceByStatusAndBranch(branchid, status, voucherdate1, voucherdate2);
                var statisticVm = Mapper.Map<List<SaleInvoiceViewModel>>(model);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, statisticVm);
                return response;
            });
        }
       
        [Route("reportSaleByEmployee")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportSaleByEmployee(HttpRequestMessage request, DateTime? date1, DateTime? date2, Guid? branchid)
        {
            return CreateHttpResponse(request, () =>
            {
                var statistic = _statisticService.ReportSaleByEmployee(date1, date2, branchid);

                var statisticVm = Mapper.Map<List<SaleByEmployeeViewModel>>(statistic);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, statisticVm);

                return response;
            });
        }

        [Route("reportSaleByCustomer")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage ReportSaleByCustomer(HttpRequestMessage request, DateTime? date1, DateTime? date2, Guid? branchid)
        {
            return CreateHttpResponse(request, () =>
            {
                var saleByCustomer = _statisticService.ReportSaleByCustomer(date1, date2, branchid);

                var saleByCustomerVm = Mapper.Map<List<SaleByCustomerViewModel>>(saleByCustomer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleByCustomerVm);

                return response;
            });
        }

        [Route("reportSaleByDate")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportSaleByDate(HttpRequestMessage request, Guid branchid, DateTime voucherdate1, DateTime voucherdate2)
        {
            return CreateHttpResponse(request, () =>
            {
                var statistic = _statisticService.ReportSaleByDate(branchid, voucherdate1, voucherdate2);

                var statisticVm = Mapper.Map<List<SaleByDateViewModel>>(statistic);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, statisticVm);

                return response;
            });
        }

        [Route("reportSaleByBranch")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage ReportSaleByBranch(HttpRequestMessage request, DateTime? date1, DateTime? date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var saleByBranch = _statisticService.ReportSaleByBranch(date1, date2);

                var saleByBranchrVm = Mapper.Map<List<SaleByBranchViewModel>>(saleByBranch);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, saleByBranchrVm);

                return response;
            });
        }

        [Route("reportBestSell")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportBestSell(HttpRequestMessage request, Guid branchid, DateTime? date1, DateTime? date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _statisticService.ReportBestSell(branchid, date1, date2);

                var listSaleInvoiceVm = Mapper.Map<List<BestSellViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("reportOrderStatistics")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetOrderStatistics(HttpRequestMessage request, Guid branchid, DateTime? date1, DateTime? date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _statisticService.ReportOrderStatistics(branchid, date1, date2);

                var listSaleInvoiceVm = Mapper.Map<List<OrderStatisticsViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }

        [Route("reportSaleOrderReturn")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage ReportSaleOrderReturn(HttpRequestMessage request, Guid branchid, DateTime? date1, DateTime? date2)
        {
            return CreateHttpResponse(request, () =>
            {
                var listSaleInvoice = _statisticService.ReportSaleOrderReturn(branchid, date1, date2);

                var listSaleInvoiceVm = Mapper.Map<List<SaleOrderReturnViewModel>>(listSaleInvoice);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSaleInvoiceVm);

                return response;
            });
        }


        //báo cáo kho
        [Route("reportInventoriesHighRate")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportInventoriesHighRate(HttpRequestMessage request, Guid? branchid)
        {

            return CreateHttpResponse(request, () =>
            {
                var model = _statisticService.ReportInventoriesHighRate(branchid);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("reportInventoriesLowRate")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage GetReportInventoriesLowRate(HttpRequestMessage request, Guid? branchid)
        {

            return CreateHttpResponse(request, () =>
            {
                var model = _statisticService.ReportInventoriesLowRate(branchid);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("reportInventoriesStockAdjustments")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage ReportInventoriesStockAdjustments(HttpRequestMessage request, Guid branchid,DateTime? date1,DateTime? date2)
        {

            return CreateHttpResponse(request, () =>
            {
                var model = _statisticService.ReportInventoriesStockAdjustments(branchid,date1,date2);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

    }
}
