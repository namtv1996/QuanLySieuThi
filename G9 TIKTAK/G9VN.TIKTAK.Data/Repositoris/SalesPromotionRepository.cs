using System.Collections.Generic;
using System.Linq;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G9VN.TIKTAK.Common.ViewsModel;
using System.Data.SqlClient;
using G9VN.TIKTAK.Web.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface ISalesPromotionRepository : IRepository<SalesPromotion>
    {
        void UpdateInventory(Guid ID);
        string GetCode(string parentID);
        IEnumerable<SalesPromotion> GetByVoucherID(Guid id);
    }
    class SalesPromotionRepository : RepositoryBase<SalesPromotion>, ISalesPromotionRepository
    {
        public SalesPromotionRepository(IDbFactory dbFactory): base(dbFactory){}


        public string GetCode(string parentID)
        {
            IEnumerable<SalesPromotion> ls = this.DbContext.salesPromotion.Where(x => x.VoucherNo.Contains(parentID));
            if (ls.Count() == 0)
            {
                return "";
            }
            List<SalesPromotion> ls2 = ls.OrderByDescending(x => x.VoucherNo).ToList();
            return ls2[0].VoucherNo;
        }


        public System.Collections.Generic.IEnumerable<SalesPromotion> GetByVoucherID(Guid id)
        {
            return this.DbContext.salesPromotion.Where(x => x.VoucherID == id);
        }

        public void UpdateInventory(Guid ID)
        {
            var parameter = new SqlParameter[]
            {
                new SqlParameter("@id",ID)
            };

            try
            {
                var result = DbContext.Database.ExecuteSqlCommand("SP_UpdateQuantityPromotion @id", parameter);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

            }
        }
    }
}
