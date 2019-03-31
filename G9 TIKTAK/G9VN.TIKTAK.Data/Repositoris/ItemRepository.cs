using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IItemRepository : IRepository<Item>
    {
        IEnumerable<Item> GetAll(string key);
    }

    public class ItemRepository : RepositoryBase<Item>, IItemRepository
    {
        public ItemRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
        public IEnumerable<Item> GetAll(string key)
        {
            return this.DbContext.Item.Where(x =>x.Name.Contains(key));
        }
    }
}