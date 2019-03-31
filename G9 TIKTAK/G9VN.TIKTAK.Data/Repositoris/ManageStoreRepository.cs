using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.SYSTEM.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Data.Entity;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IManageStoreRepository : IRepository<ManageStore>
    {
        IQueryable<ManageStore> GetAll();
        ManageStore Add(ManageStore model);
        IQueryable<ManageStore> getStoreName(string key);
        string GetStoreName(string userName);
        ManageStore GetStore(string key);      
    }
    public class ManageStoreRepository : RepositoryBaseSYS<ManageStore>, IManageStoreRepository, IDisposable
    {
        #region Properties

        private TIKTAK_SYSTEM_DbContext dataContext;
        private readonly IDbSet<ManageStore> dbSet;
        #endregion Properties
        public ManageStoreRepository(IDbFactory dbFactory) : base(dbFactory)
        {
            dataContext = new TIKTAK_SYSTEM_DbContext();
            dbSet = dataContext.Set<ManageStore>();
        }

        public ManageStore Add(ManageStore model)
        {
            ManageStore mn= dbSet.Add(model);
            dataContext.SaveChanges();
            return mn;
        }

        public IQueryable<ManageStore> GetAll()
        {
            return dataContext.Set<ManageStore>().AsQueryable();
        }

        public IQueryable<ManageStore> getStoreName( string key)
        {
            return this.dataContext.ManageStore.Where(x => x.StoreName == key);
        }

        public void Dispose()
        {
            dataContext.Dispose();
        }

        public string GetStoreName(string userName)
        {
            return this.dataContext.Set<ManageStore>().Where<ManageStore>(x => x.StoreName == userName).Single().StoreName;
        }

        public ManageStore GetStore(string key)
        {
            return this.dataContext.Set<ManageStore>().Where<ManageStore>(x => x.StoreName == key).Single();
        }

       
    }
}
