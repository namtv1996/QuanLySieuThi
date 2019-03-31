using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IConfigurationStoreRepository : IRepository<ConfigurationStore>
    {
        ConfigurationStore getConfigByStore(Guid? manageStoreID);
      
    }
    public class ConfigurationStoreRepository : RepositoryBaseSYS<ConfigurationStore>, IConfigurationStoreRepository, IDisposable
    {
      
        private TIKTAK_SYSTEM_DbContext dataContext;
        private readonly IDbSet<ConfigurationStore> dbSet;

        public ConfigurationStoreRepository(IDbFactory dbFactory) : base(dbFactory)
        {
            dataContext = new TIKTAK_SYSTEM_DbContext();
            dbSet = dataContext.Set<ConfigurationStore>();
        }

        public void Dispose()
        {
            dataContext.Dispose();
        }

        public ConfigurationStore getConfigByStore(Guid? manageStoreID)
        {
            return this.dataContext.ConfigurationStore.Where(x => x.ManageStoreID == manageStoreID).SingleOrDefault();
        }
    }
}
