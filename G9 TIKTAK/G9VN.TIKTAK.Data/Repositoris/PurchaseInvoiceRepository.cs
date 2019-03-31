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
    public interface IPurchaseInvoiceRepository : IRepository<PurchaseInvoice>
    {
        IEnumerable<PurchaseInvoice> GetByVoucherType(int id);
        IEnumerable<PurchaseInvoice> GetByStatus(int id, int status);
        IEnumerable<PurchaseInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2);
        string GetCode(int id1, int id2);
        void DeleteInwardStock(Guid id);
        IEnumerable<PurchaseInvoice> GetByInwardStockID(int vouchertype, Guid inwardstockid);
        IEnumerable<PurchaseInvoice> GetByOriginalVoucherNo(int vouchertype, string voucherno);
        IEnumerable<PurchaseInvoice> GetByInwardStockIdAndStatus(int vouchertype, Guid inwardstockid, int status);
        IEnumerable<PurchaseInvoice> GetPurchaseInvoiceBySaleReturn(string sr_voucherno);
        IEnumerable<PurchaseInvoice> GetPurchaseInvoiceByObjectID(int voucherType, Guid object_id);
        IEnumerable<PurchaseInvoice> GetVoucherByInwardStockID(int vouchertype1,int vouchertype2, Guid inwardstockid);
    }
    public class PurchaseInvoiceRepository : RepositoryBase<PurchaseInvoice>, IPurchaseInvoiceRepository
    {
        public PurchaseInvoiceRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public void DeleteInwardStock(Guid id)
        {
            var parameter = new SqlParameter[]
            {
                new SqlParameter("@id",id)
            };

            try
            {
                var result = DbContext.Database.ExecuteSqlCommand("deleteInwardStock @id", parameter);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

            }

        }

        public IEnumerable<PurchaseInvoice> GetByInwardStockID(int vouchertype, Guid inwardstockid)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType == vouchertype && x.InwardStockID == inwardstockid);
        }

        public IEnumerable<PurchaseInvoice> GetByInwardStockIdAndStatus(int vouchertype, Guid inwardstockid, int status)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType == vouchertype && x.InwardStockID == inwardstockid && x.Status == status);
        }

        public IEnumerable<PurchaseInvoice> GetByOriginalVoucherNo(int vouchertype, string voucherno)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType == vouchertype && x.OriginalVoucherNo == voucherno);
        }

        public IEnumerable<PurchaseInvoice> GetByStatus(int id, int status)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType == id && x.Status == status);
        }

        public IEnumerable<PurchaseInvoice> GetByVoucherType(int id)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType == id);
        }
        public IEnumerable<PurchaseInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType >= vouchertype1 && x.VoucherType <= vouchertype2).ToList();
        }
        public string GetCode(int id1, int id2)
        {

            IEnumerable<PurchaseInvoice> ls = GetByVoucherType1(id1, id2);
            if (ls.Count() == 0)
            {
                return "";
            }
            List<PurchaseInvoice> ls2 = ls.OrderByDescending(x => x.INVoucherNo).ToList();
            return ls2[0].INVoucherNo;
        }

        public IEnumerable<PurchaseInvoice> GetPurchaseInvoiceByObjectID(int voucherType, Guid object_id)
        {
            return this.DbContext.PurchaseInvoice.Where(x=>x.ObjectID==object_id && x.VoucherType==voucherType).ToList();
        }

        public IEnumerable<PurchaseInvoice> GetPurchaseInvoiceBySaleReturn(string sr_voucherno)
        {
            var result = (from a in DbContext.PurchaseInvoice.Where(x=>x.VoucherType == 9)
                          join b in DbContext.SaleInvoice on a.OriginalVoucherNo equals b.VoucherNo
                          where b.VoucherNo == sr_voucherno
                          select a).ToList();
            return result;
        }

        public IEnumerable<PurchaseInvoice> GetVoucherByInwardStockID(int vouchertype1, int vouchertype2, Guid inwardstockid)
        {
            return this.DbContext.PurchaseInvoice.Where(x => x.VoucherType >= vouchertype1 && x.VoucherType <= vouchertype2 && x.InwardStockID == inwardstockid).OrderByDescending(x=>x.CreatedDate).ToList();
        }
    }
}
