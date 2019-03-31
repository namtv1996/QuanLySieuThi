using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.SYSTEM.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IApplicationUserGroupRepository : IRepository<ApplicationUserGroup>
    {
    }

    public class ApplicationUserGroupRepository : RepositoryBaseSYS<ApplicationUserGroup>, IApplicationUserGroupRepository
    {
        public ApplicationUserGroupRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}