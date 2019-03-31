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
    public interface INotificationsRepository: IRepository<Notifications>
    {
        List<Notifications> getNotification(Guid id);
    }
    public class NotificationsRepository: RepositoryBaseSYS<Notifications>, INotificationsRepository, IDisposable
    {
        private TIKTAK_SYSTEM_DbContext dataContext;
        private readonly IDbSet<Notifications> dbSet;

        public NotificationsRepository(IDbFactory dbFactory) : base(dbFactory)
        {
            dataContext = new TIKTAK_SYSTEM_DbContext();
            dbSet = dataContext.Set<Notifications>();
        }
        public void Dispose()
        {
            dataContext.Dispose();
        }
        public List<Notifications> getNotification(Guid id)
        {
            return this.dataContext.Set<Notifications>().Where<Notifications>(x => x.ManageStoreID == null || x.ManageStoreID == id).OrderByDescending(x => x.CreatedDate).ToList();
        }
     
    }
}
