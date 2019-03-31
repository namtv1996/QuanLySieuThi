using G9VN.TIKTAK.Common.ViewsModel;
using System;
using System.Collections.Generic;
using G9VN.TIKTAK.Model.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G9VN.TIKTAK.Data.Infrastructure;
using System.Linq.Expressions;
using System.Data.SqlClient;


namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IReportsRepository : IRepository<SaleInvoice>
    {
       //báo cáo lãi lỗ
        ProfitAndLossViewModel ReportProfitAndLoss(Guid BranchID,DateTime date1, DateTime date2);
        //báo cáo sổ quỹ
        List<CashBookViewModel> ReportCashBook(Guid BranchID, DateTime date1, DateTime date2);
        CashBook1ViewModel ReportCashBook1(Guid BranchID, DateTime date1, DateTime date2);
        //
        List<TransactionStockViewModel> ReportTransactionStock(Guid branchid, DateTime? date1, DateTime? date2);
        // báo cáo xuất nhập tồn
        List<ImportExportStockViewModel> ReportImportExport(Guid BranchID, DateTime date1, DateTime date2);
    }
    public class ReportsRepository : RepositoryBase<SaleInvoice>,IReportsRepository
    {
        public ReportsRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public List<CashBookViewModel> ReportCashBook(Guid BranchID, DateTime date1, DateTime date2)
        {
            return this.DbContext.Database.SqlQuery<CashBookViewModel>("SP_CashBook @BranchID,@date1,@date2", new SqlParameter("@BranchID", BranchID), new SqlParameter("@date1", date1), new SqlParameter("@date2", date2)).ToList();
        }

       

        public CashBook1ViewModel ReportCashBook1(Guid BranchID, DateTime date1, DateTime date2)
        {
            return this.DbContext.Database.SqlQuery<CashBook1ViewModel>("SP_CashBook1 @BranchID,@date1,@date2", new SqlParameter("@BranchID", BranchID), new SqlParameter("@date1", date1), new SqlParameter("@date2", date2)).Single(); ;
        }

        public List<ImportExportStockViewModel> ReportImportExport(Guid BranchID, DateTime date1, DateTime date2)
        {
            return this.DbContext.Database.SqlQuery<ImportExportStockViewModel>("SP_ReportImportExport @BranchID,@date1,@date2",new SqlParameter("@BranchID",BranchID),new SqlParameter("@date1",date1),new SqlParameter("@date2",date2)).ToList();
        }

        public ProfitAndLossViewModel ReportProfitAndLoss(Guid BranchID, DateTime date1, DateTime date2)
        {
            return this.DbContext.Database.SqlQuery<ProfitAndLossViewModel>("SP_ReportProfitAndLosses @BranchID,@date1,@date2", 
                new SqlParameter("@BranchID", BranchID), 
                new SqlParameter("@date1", date1), 
                new SqlParameter("@date2", date2)).Single();
        }

        public List<TransactionStockViewModel> ReportTransactionStock(Guid branchid, DateTime? date1, DateTime? date2)
        {
            try
            {
            
                List<TransactionStockViewModel> list = new List<TransactionStockViewModel>();
                var result = DbContext.Database.SqlQuery<TransactionStockViewModel>("reportTransactionInwardStock @branchid,@date1,@date2", 
                    new SqlParameter("@branchid", branchid),
                    new SqlParameter("@date1", date1),
                    new SqlParameter("@date2", date2)).ToList();
                for (int i = 0; i < result.Count; i++)
                {
                    list.Add(result[i]);
                }
                var result1 = DbContext.Database.SqlQuery<TransactionStockViewModel>("reportTransactionSaleOrder @branchid,@date1,@date2", 
                    new SqlParameter("@branchid", branchid),
                    new SqlParameter("@date1", date1),
                    new SqlParameter("@date2", date2)).ToList();
                for (int i = 0; i < result1.Count; i++)
                {
                    list.Add(result1[i]);
                }
                var result2 = DbContext.Database.SqlQuery<TransactionStockViewModel>("reportTransactionAdjustment @branchid,@date1,@date2", 
                    new SqlParameter("@branchid", branchid),
                    new SqlParameter("@date1", date1),
                    new SqlParameter("@date2", date2)).ToList();
                for (int i = 0; i < result2.Count; i++)
                {
                    list.Add(result2[i]);
                }
                return list.OrderByDescending(x => x.VoucherDate).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
       

       
    
}
