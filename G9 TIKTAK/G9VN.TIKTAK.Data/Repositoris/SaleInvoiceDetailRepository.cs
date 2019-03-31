using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Data.SqlClient;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface ISaleInvoiceDetailRepository : IRepository<SaleInvoiceDetail>
    {
        IEnumerable<SaleInvoiceDetail> GetByVoucherID(Guid id);
        void DeleteByVoucherId(Guid id);
        IEnumerable<SaleInvoiceDetail> GetInventoryTransaction();
        IEnumerable<SaleInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype);
    }

    public class SaleInvoiceDetailRepository : RepositoryBase<SaleInvoiceDetail>, ISaleInvoiceDetailRepository
    {
        public SaleInvoiceDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public void DeleteByVoucherId(Guid id)
        {
            var parameters = new SqlParameter[]{
                new SqlParameter("@voucherid",id)
            };
           DbContext.Database.ExecuteSqlCommand("SP_delete_saleinvoicedetail_byvoucherid @voucherid", parameters);
        }

        public IEnumerable<SaleInvoiceDetail> GetByVoucherID(Guid id)
        {
            return this.DbContext.SaleInvoiceDetail.Where(x => x.VoucherID == id).OrderBy(x=>x.SortOrder);
        }

        public IEnumerable<SaleInvoiceDetail> GetInventoryTransaction()
        {
            var result = (from a in DbContext.SaleInvoiceDetail
                          join b in DbContext.SaleInvoice on a.VoucherID equals b.VoucherID
                          where b.StatusID == 1 || b.StatusID == 3
                          select a).ToList();
            return result;
        }

        public IEnumerable<SaleInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype)
        {
            var result = (from a in DbContext.SaleInvoiceDetail
                          join b in DbContext.SaleInvoice.Where(x => x.VoucherType == vouchertype) on a.VoucherID equals b.VoucherID
                          join c in DbContext.SaleInvoice.Where(x => x.VoucherType >=10 && x.VoucherType<=14) on b.OriginalVoucherNo equals c.VoucherNo
                          where c.VoucherNo == voucherno
                          select a).ToList();
            return result;
        }
    }
}