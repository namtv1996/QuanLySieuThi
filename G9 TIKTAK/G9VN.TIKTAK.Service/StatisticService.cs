using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Service
{
    public interface IStatisticService
    {
        List<ByEndDayStatisticViewModel> GetByEndDayStatistic(Guid branchid, DateTime? voucherdate1, DateTime? voucherdate2);
        List<SaleInvoice> GetSaleInvoiceByStatusAndBranch(Guid branchid, int status, DateTime? voucherdate1, DateTime? voucherdate2);

        List<InventoriesHighRateViewModel> ReportInventoriesHighRate(Guid? branchid);
        List<InventoriesLowRateViewModel> ReportInventoriesLowRate(Guid? branchid);
        List<InventoriesStockAdjustments> ReportInventoriesStockAdjustments(Guid branchid, DateTime? date1, DateTime? date2);

        List<SaleByEmployeeViewModel> ReportSaleByEmployee(DateTime? date1, DateTime? date2, Guid? branchid);
        List<SaleByCustomerViewModel> ReportSaleByCustomer(DateTime? date1, DateTime? date2, Guid? branchid);
        List<SaleByDateViewModel> ReportSaleByDate(Guid branchid, DateTime voucherdate1, DateTime voucherdate2);
        List<SaleByBranchViewModel> ReportSaleByBranch(DateTime? date1, DateTime? date2);
        List<BestSellViewModel> ReportBestSell(Guid branchid, DateTime? date1, DateTime? date2);
        List<OrderStatisticsViewModel> ReportOrderStatistics(Guid branchid, DateTime? date1, DateTime? date2);
        List<SaleOrderReturnViewModel> ReportSaleOrderReturn(Guid branchid, DateTime? date1, DateTime? date2);
    }
    public class StatisticService : IStatisticService
    {
        ISaleInvoiceRepository _saleInvoiceRepository;
        IItemOptionRepository _itemOptionRepository;
        IObjectRepository _objectRepository;
        IVoucherCheckRepository _voucherCheckRepository;

        public StatisticService(ISaleInvoiceRepository saleInvoiceRepository, 
            IItemOptionRepository itemOptionRepository, IObjectRepository objectRepository,
            IVoucherCheckRepository voucherCheckRepository)
        {
            _saleInvoiceRepository = saleInvoiceRepository;
            _itemOptionRepository = itemOptionRepository;
            _objectRepository = objectRepository;
            _voucherCheckRepository = voucherCheckRepository;
        }

        //báo cáo bán hàng
        public List<ByEndDayStatisticViewModel> GetByEndDayStatistic(Guid branchid, DateTime? voucherdate1, DateTime? voucherdate2)
        {
            return _saleInvoiceRepository.GetByEndDayStatistic(branchid, voucherdate1, voucherdate2);
        }

        public List<SaleByEmployeeViewModel> ReportSaleByEmployee(DateTime? date1, DateTime? date2, Guid? branchid)
        {
            return _saleInvoiceRepository.ReportSaleByEmployee(date1, date2, branchid);
        }

        public List<SaleByCustomerViewModel> ReportSaleByCustomer(DateTime? date1, DateTime? date2, Guid? branchid)
        {
            return _objectRepository.ReportSaleByCustomer(date1, date2, branchid);
        }

        public List<SaleInvoice> GetSaleInvoiceByStatusAndBranch(Guid branchid, int status, DateTime? voucherdate1, DateTime? voucherdate2)
        {
            return _saleInvoiceRepository.GetSaleInvoiceByStatusAndBranch(branchid, status, voucherdate1, voucherdate2);
        }

        public List<SaleByDateViewModel> ReportSaleByDate(Guid branchid, DateTime voucherdate1, DateTime voucherdate2)
        {
            return _saleInvoiceRepository.ReportSaleByDate(branchid, voucherdate1, voucherdate2);
        }

        public List<SaleByBranchViewModel> ReportSaleByBranch(DateTime? date1, DateTime? date2)
        {
            return _saleInvoiceRepository.ReportSaleByBranch(date1, date2);
        }
        public List<BestSellViewModel> ReportBestSell(Guid branchid, DateTime? date1, DateTime? date2)
        {
            return _saleInvoiceRepository.ReportBestSell(branchid, date1, date2);
        }
        public List<OrderStatisticsViewModel> ReportOrderStatistics(Guid branchid, DateTime? date1, DateTime? date2)
        {
            return _saleInvoiceRepository.ReportOrderStatistics(branchid, date1, date2);
        }

        public List<SaleOrderReturnViewModel> ReportSaleOrderReturn(Guid branchid, DateTime? date1, DateTime? date2)
        {
            return _saleInvoiceRepository.ReportSaleOrderReturn(branchid, date1, date2);
        }



        //báo cáo kho

        public List<InventoriesHighRateViewModel> ReportInventoriesHighRate(Guid? branchid)
        {
            return _itemOptionRepository.ReportInventoriesHighRate(branchid);
        }

        public List<InventoriesLowRateViewModel> ReportInventoriesLowRate(Guid? branchid)
        {
            return _itemOptionRepository.ReportInventoriesLowRate(branchid);
        }

        public List<InventoriesStockAdjustments> ReportInventoriesStockAdjustments(Guid branchid, DateTime? date1, DateTime? date2)
        {
            return _voucherCheckRepository.ReportInventoriesStockAdjustments(branchid, date1, date2);
        }
    }
}
