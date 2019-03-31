using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Service
{
    public interface IReportsService
    {
        
        //báo cáo lãi lỗ
        ProfitAndLossViewModel ReportProfitAndLoss(Guid BranchID, DateTime date1, DateTime date2);
        // báo cáo sổ quỹ
        List<CashBookViewModel> ReportCashBook(Guid BranchID, DateTime date1, DateTime date2);
        G9VN.TIKTAK.Common.ViewsModel.CashBook1ViewModel ReportCashBook1(Guid BranchID, DateTime date1, DateTime date2);
        List<TransactionStockViewModel> ReportTransactionStock(Guid branchid, DateTime? date1, DateTime? date2);
        // báo cáo xuất nhập tồn
        List<ImportExportStockViewModel> ReportImportExport(Guid BranchID, DateTime date1, DateTime date2);
    }
    public class ReportsService:IReportsService
    {
        private IReportsRepository _reportsRepository;
        private IUnitOfWork _unitOfWork;

        public ReportsService(IReportsRepository reportsRepository, IUnitOfWork unitOfWork)
        {
            this._reportsRepository = reportsRepository;
            this._unitOfWork = unitOfWork;
        }

        public List<CashBookViewModel> ReportCashBook(Guid BranchID, DateTime date1, DateTime date2)
        {
            return _reportsRepository.ReportCashBook(BranchID, date1, date2);
        }

        public G9VN.TIKTAK.Common.ViewsModel.CashBook1ViewModel ReportCashBook1(Guid BranchID, DateTime date1, DateTime date2)
        {
            return _reportsRepository.ReportCashBook1(BranchID, date1, date2);
        }

        public List<ImportExportStockViewModel> ReportImportExport(Guid BranchID, DateTime date1, DateTime date2)
        {
            return _reportsRepository.ReportImportExport(BranchID, date1, date2);
        }

        public ProfitAndLossViewModel ReportProfitAndLoss(Guid BranchID, DateTime date1, DateTime date2)
        {
            return _reportsRepository.ReportProfitAndLoss(BranchID, date1, date2);
        }
        public List<TransactionStockViewModel> ReportTransactionStock(Guid branchid, DateTime? date1, DateTime? date2)
        {
            return _reportsRepository.ReportTransactionStock(branchid, date1, date2);
        }
    }
}
