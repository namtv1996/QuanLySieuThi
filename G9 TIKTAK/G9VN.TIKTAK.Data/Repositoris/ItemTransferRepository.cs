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

    public interface IItemTransferRepository : IRepository<StockTransfer>
    {
        string GetCode(string parentID);
       StockTransfer GetByVoucherID(Guid id);

    }
    public class ItemTransferRepository : RepositoryBase<StockTransfer>, IItemTransferRepository
    {
        public ItemTransferRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }


        public StockTransfer GetByVoucherID(Guid id)
        {
            return this.DbContext.StockTransfer.Single(x => x.VoucherID == id);
        }

        public string GetCode(string parentID)
        {
            IEnumerable<StockTransfer> ls = this.DbContext.StockTransfer.Where(x => x.VoucherNo.Contains(parentID));
            if (ls.Count() == 0)
            {
                return "";
            }
            List<StockTransfer> ls2 = ls.OrderByDescending(x => x.VoucherNo).ToList();
            return ls2[0].VoucherNo;
        }
    }
}
