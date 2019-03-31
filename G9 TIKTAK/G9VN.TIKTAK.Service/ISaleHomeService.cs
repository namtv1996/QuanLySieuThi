using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface ISaleHomeService
    {
        void Add(SaleInvoice SaleInvoice);

        void Update(SaleInvoice SaleInvoice);

        IEnumerable<SaleInvoice> GetAll();
        IEnumerable<SaleInvoice> GetByVoucherType(int id);
        List<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2);
        IEnumerable<SaleInvoice> GetByStatusID(int id);
        //lấy ds phiếu thu
        IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no);
        //lấy ds phiếu đóng gói
        IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno);
        //lấy ds phiếu thu với thông tin thêm
        IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID);
        SaleInvoice GetByVoucherNo(string key);
        //List<OrderStatisticsViewModel> ReportOrderStatistics();
        //List<SaleByEmployeeViewModel> ReportSaleByEmployee();
        SaleInvoice GetByID(Guid id);
        //List<SaleByDateViewModel> ReportSaleByDate();
        List<ReportHomeViewModel> reportHome();
        ReportHomeNewViewModel reportHomeNew();
        void SaveChanges();
        string getCode(int id1, int id2);
        //List<TransactionStockViewModel> ReportTransactionStock();
        //List<BestSellViewModel> ReportBestSell();
    }
    public class SaleHomeService : ISaleHomeService
    {
        private ISaleInvoiceRepository _SaleInvoiceRepository;
        private IUnitOfWork _unitOfWork;

        public SaleHomeService(ISaleInvoiceRepository SaleInvoiceRepository, IUnitOfWork unitOfWork)
        {
            this._SaleInvoiceRepository = SaleInvoiceRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(SaleInvoice SaleInvoice)
        {
            _SaleInvoiceRepository.Add(SaleInvoice);
        }

        public IEnumerable<SaleInvoice> GetAll()
        {
            return _SaleInvoiceRepository.GetAll();
        }

        public IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID)
        {
            return _SaleInvoiceRepository.GetAllReceipt(BranchID);
        }

        public SaleInvoice GetByID(Guid id)
        {
            return _SaleInvoiceRepository.GetSingleById(id);
        }

        public IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no)
        {
            return _SaleInvoiceRepository.GetByOriginalVoucherNo(original_voucher_no);
        }

        public IEnumerable<SaleInvoice> GetByStatusID(int id)
        {
            return _SaleInvoiceRepository.GetByStatusID(id);
        }
        public SaleInvoice GetByVoucherNo(string key)
        {
            return _SaleInvoiceRepository.GetByVoucherNo(key);
        }
        public IEnumerable<SaleInvoice> GetByVoucherType(int id)
        {
            return _SaleInvoiceRepository.GetByVoucherType(id);
        }
        //lấy saleinvoice theo khoảng vouchertype
        public List<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2)
        {
            return _SaleInvoiceRepository.GetByVoucherType1(vouchertype1, vouchertype2);
        }

        public string getCode(int id1, int id2)
        {
            return _SaleInvoiceRepository.GetCode(id1, id2);
        }

        public IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno)
        {
            return _SaleInvoiceRepository.GetPackageByOriginalVoucherNo(originalvoucherno);
        }

        //public List<BestSellViewModel> ReportBestSell()
        //{
        //    return _SaleInvoiceRepository.ReportBestSell();
        //}

        public List<ReportHomeViewModel> reportHome()
        {
            return _SaleInvoiceRepository.reportHome();
        }
        public ReportHomeNewViewModel reportHomeNew()
        {
            return _SaleInvoiceRepository.reportHomeNew();
        }

        //public List<OrderStatisticsViewModel> ReportOrderStatistics()
        //{
        //    return _SaleInvoiceRepository.ReportOrderStatistics();
        //}

        //public List<SaleByDateViewModel> ReportSaleByDate()
        //{
        //    return _SaleInvoiceRepository.ReportSaleByDate();
        //}

        //public List<SaleByEmployeeViewModel> ReportSaleByEmployee()
        //{
        //    return _SaleInvoiceRepository.ReportSaleByEmployee();
        //}

        //public List<TransactionStockViewModel> ReportTransactionStock()
        //{
        //    return _SaleInvoiceRepository.ReportTransactionStock();
        //}

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(SaleInvoice SaleInvoice)
        {
            _SaleInvoiceRepository.Update(SaleInvoice);
        }
    }
}
