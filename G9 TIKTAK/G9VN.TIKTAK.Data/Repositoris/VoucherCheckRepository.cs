using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IVoucherCheckRepository : IRepository<VoucherCheck>
    {
        IEnumerable<VoucherCheck> GetByVoucherType(int id);
        IEnumerable<VoucherCheck> GetByStatus(bool status);
        List<InventoriesStockAdjustments> ReportInventoriesStockAdjustments(Guid branchid, DateTime? date1, DateTime? date2);
        string GetCode();
    }
    public class VoucherCheckRepository : RepositoryBase<VoucherCheck>, IVoucherCheckRepository
    {
        public VoucherCheckRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<VoucherCheck> GetByStatus(bool status)
        {
            return this.DbContext.VoucherCheck.Where(x => x.Status == status);
        }

        public IEnumerable<VoucherCheck> GetByVoucherType(int id)
        {
            return this.DbContext.VoucherCheck.Where(x => x.VoucherType == id);
        }

        public string GetCode()
        {

            IEnumerable<VoucherCheck> ls = this.DbContext.VoucherCheck.Where(x => x.VoucherType == 3).OrderByDescending(x => x.VoucherDate).ToList();
            if (ls.Count() == 0)
            {
                return "";
            }
            List<VoucherCheck> ls2 = ls.OrderByDescending(x => x.VoucherCode).ToList();
            return ls2[0].VoucherCode;
        }

        public List<InventoriesStockAdjustments> ReportInventoriesStockAdjustments(Guid branchid, DateTime? date1, DateTime? date2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@branchid",branchid),
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2)
                };
                var result = DbContext.Database.SqlQuery<InventoriesStockAdjustments>("reportsInventoriesStockAdjustments @branchid,@date1,@date2", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
