using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IPurchaseInvoiceDetailRepository : IRepository<PurchaseInvoiceDetail>
    {
        IEnumerable<PurchaseInvoiceDetail> GetByVoucherID(Guid id);
        IEnumerable<PurchaseInvoiceDetail> GetDetailByInwardStockID(Guid id, int vouchertype,int vct);
        IEnumerable<PurchaseInvoiceDetail> GetInventoryTransaction(int voucher_type, int voucher_type2);
        IEnumerable<PurchaseInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype, int vct);
        void DeleteMultiByVoucherID(Guid voucher_id);
    }
    public class PurchaseInvoiceDetailRepository : RepositoryBase<PurchaseInvoiceDetail>, IPurchaseInvoiceDetailRepository
    {
        public PurchaseInvoiceDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
        public IEnumerable<PurchaseInvoiceDetail> GetByVoucherID(Guid id)
        {
            return this.DbContext.PurchaseInvoiceDetail.Where(x => x.VoucherID == id);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetInventoryTransaction(int voucher_type, int voucher_type2)
        {
            var result = (from a in DbContext.PurchaseInvoiceDetail
                          join b in DbContext.PurchaseInvoice on a.VoucherID equals b.VoucherID                          
                          where b.Status==1 && (b.VoucherType== voucher_type || b.VoucherType== voucher_type2)
                          select a).ToList();
            return result;
        }

        public IEnumerable<PurchaseInvoiceDetail> GetDetailByInwardStockID(Guid id, int vouchertype,int vct)
        {
            var result = (from a in DbContext.PurchaseInvoiceDetail
                          join b in DbContext.PurchaseInvoice.Where(x => x.VoucherType == vouchertype) on a.VoucherID equals b.VoucherID
                          join c in DbContext.PurchaseInvoice.Where(x => x.VoucherType == vct) on b.InwardStockID equals c.VoucherID
                          where c.VoucherID == id
                          select a).ToList();
            return result;
        }

        public IEnumerable<PurchaseInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype, int vct)
        {
            var result = (from a in DbContext.PurchaseInvoiceDetail
                          join b in DbContext.PurchaseInvoice.Where(x => x.VoucherType == vouchertype) on a.VoucherID equals b.VoucherID
                          join c in DbContext.PurchaseInvoice.Where(x => x.VoucherType == vct) on b.OriginalVoucherNo equals c.INVoucherNo
                          where c.INVoucherNo == voucherno
                          select a).ToList();
            return result;
        }

        public void DeleteMultiByVoucherID(Guid voucher_id)
        {
            var result = this.DbContext.PurchaseInvoiceDetail.Where(x => x.VoucherID == voucher_id).ToList();
            for(int i = 0; i < result.Count; i++)
            {
                DbContext.PurchaseInvoiceDetail.Remove(result[i]);
            }
        }
    }
}
