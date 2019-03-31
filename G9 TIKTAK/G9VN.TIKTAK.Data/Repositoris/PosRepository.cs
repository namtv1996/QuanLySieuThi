using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using G9VN.TIKTAK.Common.ViewsModel;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IPosRepository : IRepository<ItemOption>
    {
        List<ItemOption> GetByItemCategory(Guid id);
        List<ItemOption> GetItem_SaleInvoice(Guid id);
        List<CartViewModel> GetItem_SaleInvoice1(Guid id);
        IEnumerable<ItemOption> GetByItemID(Guid id);
        string GetCode();
        List<InventoriesHighRateViewModel> ReportInventoriesHighRate();
        List<InventoriesLowRateViewModel> ReportInventoriesLowRate();
    }

    public class PosRepository : RepositoryBase<ItemOption>, IPosRepository
    {
        public PosRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public virtual List<ItemOption> GetByItemCategory(Guid id)
        {
            var result = (from a in DbContext.ItemOption
                          join b in DbContext.Item on a.ItemID equals b.ItemID
                          join c in DbContext.ItemCategory on b.ItemCategoryID equals c.Id
                          where c.Id == id
                          select a).ToList();
            return result;

        }

        public virtual List<ItemOption> GetItem_SaleInvoice(Guid id)
        {
            var result = (from a in DbContext.ItemOption
                          join b in DbContext.SaleInvoiceDetail on a.ID equals b.ItemID
                          join c in DbContext.SaleInvoice on b.VoucherID equals c.VoucherID
                          where c.VoucherID == id
                          select a).ToList();
            return result;
        }
        public virtual List<CartViewModel> GetItem_SaleInvoice1(Guid id)
        {
            var parameter = new SqlParameter[]
            {
                new SqlParameter("@id",id)
            };

            try
            {
                var result = DbContext.Database.SqlQuery<CartViewModel>("SP_getCartItem @id", parameter).ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

        public IEnumerable<ItemOption> GetByItemID(Guid id)
        {
            return this.DbContext.ItemOption.Where(x => x.ItemID == id);
        }

        public string GetCode()
        {

            IEnumerable<ItemOption> ls = this.DbContext.ItemOption.Where(x => x.SKU.Contains("HH"));
            if (ls.Count() == 0)
            {
                return "";
            }
            List<ItemOption> ls2 = ls.OrderByDescending(x => x.SKU).ToList();
            return ls2[0].SKU;
        }

        public List<InventoriesHighRateViewModel> ReportInventoriesHighRate()
        {
            try
            {
                var result = DbContext.Database.SqlQuery<InventoriesHighRateViewModel>("reportInventoriesHighRate").ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<InventoriesLowRateViewModel> ReportInventoriesLowRate()
        {
            try
            {
                var result = DbContext.Database.SqlQuery<InventoriesLowRateViewModel>("reportInventoriesLowRate").ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}