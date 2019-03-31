using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IRegionRepository : IRepository<Region>
    {
        IEnumerable<Region> GetOne(int grade);
        IEnumerable<Region> GetAddress(Guid key);

    }
    public class RegionRepository : RepositoryBase<Region>, IRegionRepository
    {
        public RegionRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<Region> GetAddress(Guid key)
        {
            return this.DbContext.Region.Where(x => x.ParentID == key);
        }

        public IEnumerable<Region> GetOne(int grade)
        {
            return this.DbContext.Region.Where(x => x.Grade == grade);
        }
    }
}
