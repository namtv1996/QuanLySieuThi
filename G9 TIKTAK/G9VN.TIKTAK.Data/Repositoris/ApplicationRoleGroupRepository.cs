using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.SYSTEM.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IApplicationRoleGroupRepository : IRepository<ApplicationRoleGroup>
    {
    }

    public class ApplicationRoleGroupRepository : RepositoryBaseSYS<ApplicationRoleGroup>, IApplicationRoleGroupRepository
    {
        public ApplicationRoleGroupRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}