using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface ISystemLogRepository : IRepository<SYSAuditingLog>
    {
    }

    //thuc thi interface IBranchRepository va ke thua RepositoryBase
    public class SystemLogRepository : RepositoryBase<SYSAuditingLog>, ISystemLogRepository
    {
        public SystemLogRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
   
}
