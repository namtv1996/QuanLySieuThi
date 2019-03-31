using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Data.SqlClient;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface ISalesPromotionDetailRepository : IRepository<SalesPromotionDetail>
    {
        IEnumerable<SalesPromotionDetail> GetByVoucherID(Guid id);

    }
    class SalesPromotionDetailRepository:RepositoryBase<SalesPromotionDetail>,ISalesPromotionDetailRepository
    {
          public SalesPromotionDetailRepository(IDbFactory dbFactory): base(dbFactory){}

          public System.Collections.Generic.IEnumerable<SalesPromotionDetail> GetByVoucherID(Guid id)
          {
              return this.DbContext.salesPromotionDetail.Where(x => x.VoucherID == id);
          }
    }
}
