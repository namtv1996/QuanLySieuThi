using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Common.ExcelViewModel;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IItemOptionRepository : IRepository<ItemOption>
    {
        List<ItemOption> GetByItemCategory(Guid id);
        List<ItemOption> GetItem_SaleInvoice(Guid id);
        //Auto Complete Product When search
        List<AutoCopleteProduct> AutoComplete(Guid BranchID);
        List<CartViewModel> GetItem_SaleInvoice1(Guid id);
        IEnumerable<ItemOption> GetByItemID(Guid id);
        string GetCode();
        List<ItemOtionViewModelExcel> GetEX();
        List<InventoriesHighRateViewModel> ReportInventoriesHighRate(Guid? branchid);
        List<InventoriesLowRateViewModel> ReportInventoriesLowRate(Guid? branchid);

        // ds tuy chon theo chi nhanh
        List<ItemOptionByBranchIDViewModel> GetListItemOptionByBranch(Guid BranchID);

        int DeleteItemOption(Guid id, Guid itemid);

    }

    public class ItemOptionRepository : RepositoryBase<ItemOption>, IItemOptionRepository
    {
        public ItemOptionRepository(IDbFactory dbFactory) : base(dbFactory)
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

        public List<InventoriesHighRateViewModel> ReportInventoriesHighRate(Guid? branchid)
        {
            try
            {
                var result = DbContext.Database.SqlQuery<InventoriesHighRateViewModel>("reportInventoriesHighRate @branchid",
                    new SqlParameter("@branchid", branchid)
                ).ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<InventoriesLowRateViewModel> ReportInventoriesLowRate(Guid? branchid)
        {
            try
            {
                var result = DbContext.Database.SqlQuery<InventoriesLowRateViewModel>("reportInventoriesLowRate @branchid",
                    new SqlParameter("@branchid", branchid)
                ).ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<AutoCopleteProduct> AutoComplete(Guid BranchID)
        {
            return this.DbContext.Database.SqlQuery<AutoCopleteProduct>("SP_AutoCompleteProduct @BranchID",
                new SqlParameter("@BranchID", BranchID)).OrderByDescending(x => x.SKU).ToList();
        }

        public List<ItemOptionByBranchIDViewModel> GetListItemOptionByBranch(Guid BranchID)
        {
            return this.DbContext.Database.SqlQuery<ItemOptionByBranchIDViewModel>("SP_SelectItemOptionByBranchID @BranchID", new SqlParameter("@BranchID", BranchID)).OrderByDescending(x => x.CreateDate).ToList();
        }

        public int DeleteItemOption(Guid id, Guid itemid)
        {
            var listSaleOrder = (from a in DbContext.SaleInvoice
                                 join b in DbContext.SaleInvoiceDetail on a.VoucherID equals b.VoucherID
                                 join c in DbContext.ItemOption on b.ItemID equals c.ID
                                 where c.ID == id
                                 select a).ToList();

            var listPurchaseInvoice = (from a in DbContext.PurchaseInvoice
                                       join b in DbContext.PurchaseInvoiceDetail on a.VoucherID equals b.VoucherID
                                       join c in DbContext.ItemOption on b.ItemID equals c.ID
                                       where c.ID == id
                                       select a).ToList();

            if(listSaleOrder.Count <= 0 && listPurchaseInvoice.Count <= 0)
            {
                DbContext.Database.ExecuteSqlCommand("SP_DeleteItemOption @id, @itemid",
                    new SqlParameter("@id",id),
                    new SqlParameter("@itemid", itemid)
                );

                return 0;
            }
            else
            {
                return 1;
            }

        }

        public List<ItemOtionViewModelExcel> GetEX()
        {
            var result = DbContext.Database.SqlQuery<ItemOtionViewModelExcel>("SP_getExcelItemOption").ToList();
            return result;

        }
    }
}