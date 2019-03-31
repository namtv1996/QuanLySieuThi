using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IPricePolicyRepository : IRepository<PricePolicy>
    {

    }
    public class PricePolicyRepository:RepositoryBase<PricePolicy>, IPricePolicyRepository
    {
        public PricePolicyRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
