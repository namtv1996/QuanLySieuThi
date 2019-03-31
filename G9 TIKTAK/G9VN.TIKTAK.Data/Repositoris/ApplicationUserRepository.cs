using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IApplicationUserRepository : IRepository<ApplicationUser>
    {
        List<ApplicationUser> GetAll(string userName);
        Guid GetStoreID(string userName);
        string GetStoreName(string userName);
        ManageStore getStoreByUserName(string userName);
        ApplicationUser GetUserName(string key);
    }

    public class ApplicationUserRepository : RepositoryBaseSYS<ApplicationUser>, IApplicationUserRepository
    {
        public ApplicationUserRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public List<ApplicationUser> GetAll(string userName)
        {
            var id= this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == userName).Single().ManageStoreID;
            return this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.ManageStoreID == id).ToList();
        }

        public ManageStore getStoreByUserName(string userName)
        {
            var id = this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == userName).Single().ManageStoreID;
            return this.DbContext.Set<ManageStore>().Where<ManageStore>(x => x.ManageStoreID == id).Single();
        }

        public Guid GetStoreID(string userName)
        {
            return this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == userName).Single().ManageStoreID;
        }

        public string GetStoreName(string userName)
        {
            return this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == userName).Single().StoreName;
        }

        public ApplicationUser GetUserName(string key)
        {
            return this.DbContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == key).Single();
        }
    }
}