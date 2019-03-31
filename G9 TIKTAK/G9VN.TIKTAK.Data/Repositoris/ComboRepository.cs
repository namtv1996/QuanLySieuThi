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
    public interface IComboRepository : IRepository<ComboDetail>
    {
        IEnumerable<ComboDetail> GetByID(Guid id);

    }
    public class ComboRepository : RepositoryBase<ComboDetail>, IComboRepository
    {
        public ComboRepository(IDbFactory dbFactory): base(dbFactory)
        {

        }


        public IEnumerable<ComboDetail> GetByID(Guid id)
        {
            return this.DbContext.ComboDetail.Where(x => x.ComboID == id);
        }
    }
}
