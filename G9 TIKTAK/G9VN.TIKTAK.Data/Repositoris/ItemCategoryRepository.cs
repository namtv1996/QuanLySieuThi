using System;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System.Collections.Generic;
using System.Linq;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IItemCategoryRepository:IRepository<ItemCategory>
    {
        IEnumerable<ItemCategory> GetAll(string key);
    }

    public class ItemCategoryRepository : RepositoryBase<ItemCategory>, IItemCategoryRepository
    {
        public ItemCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<ItemCategory> GetAll(string key)
        {
          
            return this.DbContext.ItemCategory.Where(x => x.ItemCategoryName.Contains(key));
        }
    }
}