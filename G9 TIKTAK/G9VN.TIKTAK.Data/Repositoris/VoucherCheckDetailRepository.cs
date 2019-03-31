using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IVoucherCheckDetailRepository : IRepository<VoucherCheckDetail>
    {
        IEnumerable<VoucherCheckDetail> GetByVoucherID(Guid id);
      
       
    }
    public class VoucherCheckDetailRepository : RepositoryBase<VoucherCheckDetail>, IVoucherCheckDetailRepository
    {
        public VoucherCheckDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
        public IEnumerable<VoucherCheckDetail> GetByVoucherID(Guid id)
        {
            return this.DbContext.VoucherCheckDetail.Where(x => x.VoucherID == id);
        }

       
    }
}
