using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{

    public interface IObjectCategoryRepository : IRepository<ObjectCategory>
    {
        IEnumerable<ObjectCategory> GetByObjectKind(int id);
    }
    public class ObjectCategoryRepository : RepositoryBase<ObjectCategory>, IObjectCategoryRepository
    {
        public ObjectCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<ObjectCategory> GetByObjectKind(int id)
        {
            return this.DbContext.ObjectCategory.Where(x => x.ObjectKind == id);
        }
    }
}
