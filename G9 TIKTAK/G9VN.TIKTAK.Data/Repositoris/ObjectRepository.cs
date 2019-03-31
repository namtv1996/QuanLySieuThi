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
    public interface IObjectRepository : IRepository<Object1>
    {
        IEnumerable<Object1> GetByObjectKind(int id);
        IEnumerable<Object1> GetByObjectKind(int id,string key);
        IEnumerable<Object1> GetByStatus(bool status);
        IEnumerable<Object1> GetObjectByObjectCategory(int objKind, Guid id);
        List<SaleByCustomerViewModel> ReportSaleByCustomer(DateTime? date1, DateTime? date2, Guid? branchid);
        string GetCode(string parentID);
        CountVoucherAndTotalAmount CountVoucherAndTotalAmountOfObject(Guid id);
    }

    public class ObjectRepository : RepositoryBase<Object1>, IObjectRepository
    {
        public ObjectRepository(IDbFactory dbFactory) : base(dbFactory)
        {
          
        }
        public virtual IEnumerable<Object1> GetByObjectKind(int id)
        {            
            return this.DbContext.Object.Where(x => x.ObjectKind == id);
        }

        public IEnumerable<Object1> GetByObjectKind(int id, string key)
        {
            IEnumerable<Object1> list_obj;
            if (key == null || key == "")
            {
                list_obj = this.DbContext.Object.Where(x => x.ObjectKind == id);
            }else
            {
                list_obj = this.DbContext.Object.Where(x => x.ObjectKind == id && (x.ObjectName.Contains(key) || x.Tel.Contains(key) || x.ObjectAddress.Contains(key) || x.ObjectCode.Contains(key)));

            }
            return list_obj;
        }

        public IEnumerable<Object1> GetByStatus(bool status)
        {
            return this.DbContext.Object.Where(x => x.ObjectKind == 1 && x.Status == status);
        }

        public List<SaleByCustomerViewModel> ReportSaleByCustomer(DateTime? date1, DateTime? date2, Guid? branchid)
        {          
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2),
                    new SqlParameter("@branchid",branchid)
                };
                var result = DbContext.Database.SqlQuery<SaleByCustomerViewModel>("reportSaleByCustomer @date1,@date2,@branchid", parameters).ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public string GetCode(string parentID)
        {            
            IEnumerable<Object1> ls = this.DbContext.Object.Where(x => x.ObjectCode.Contains(parentID));
            if (ls.Count() == 0)
            {
                return "";
            }
            List<Object1> ls2 = ls.OrderByDescending(x => x.ObjectCode).ToList();
            return ls2[0].ObjectCode;
        }

        public IEnumerable<Object1> GetObjectByObjectCategory(int objKind, Guid id)
        {
            return this.DbContext.Object.Where(x => x.ObjectKind == objKind && x.ObjectCategoryID == id);
        }

        public CountVoucherAndTotalAmount CountVoucherAndTotalAmountOfObject(Guid id)
        {
            CountVoucherAndTotalAmount cat = new CountVoucherAndTotalAmount();

            cat.countVoucher = DbContext.SaleInvoice.Where(x => x.VoucherType == 50 && x.TransporterID == id).ToList().Count;
            cat.totalAmount = DbContext.SaleInvoice.Where(x => x.VoucherType == 50 && x.TransporterID == id).ToList().Sum(x => x.ShippingAmount);

            return cat;
        }
    }
}

