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
    public interface IItemTransferDetailRepository : IRepository<StockTransferDetail>
    {
      
        IEnumerable<StockTransferDetail> GetByVoucherID(Guid id);

    }
    public class ItemTransferDetailRepository : RepositoryBase<StockTransferDetail>, IItemTransferDetailRepository
    {
        public ItemTransferDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<StockTransferDetail> GetByVoucherID(Guid id)
        {
            return this.DbContext.StockTransferDetail.Where(x => x.VoucherID == id);
        }
    }
}
