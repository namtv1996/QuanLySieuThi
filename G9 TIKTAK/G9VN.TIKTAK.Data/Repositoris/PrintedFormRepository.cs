using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    //ke thu tu interface IRepository voi kieu Branch
    public interface IPrintedFormRepository : IRepository<PrintForm>
    {
    }

    //thuc thi interface IBranchRepository va ke thua RepositoryBase
    public class PrintedFormRepository : RepositoryBase<PrintForm>, IPrintedFormRepository
    {
        //base goi ham khoi tao cua RepositoryBase(trong do: khoi tao doi tuong dbcontext thong qua dbfactory, thiet lap kieu T la entity cua Branch)
        public PrintedFormRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}