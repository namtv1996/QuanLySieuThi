using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IPartnerRepository : IRepository<Partner>
    {

    }
    public class PartnerRepository : RepositoryBase<Partner>, IPartnerRepository
    {
        public PartnerRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
