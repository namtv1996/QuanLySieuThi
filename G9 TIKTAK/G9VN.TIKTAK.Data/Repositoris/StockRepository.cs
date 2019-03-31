using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G9VN.TIKTAK.Common.ViewsModel;
using System.Data.SqlClient;
using G9VN.TIKTAK.Web.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IStockRepository : IRepository<Stock>
    {
        //chi tiết tồn kho theo chi nhánh
        IEnumerable<StockInventoryDetail> getStockDetail(Guid id);
        // xóa chi tiết tồn kho khi xóa tùy chọn hàng hóa
        void deleteByItemOptionID(Guid ItemOptionID);
        Stock getByBranchIDItemOptionID(Guid BranchID, Guid ItemOptionID);
        void UpdateClosingQuantityWhenImportItem(UpdateInventoryParam param);
        void UpdateClosingQuantitySaleReturn(UpdateInventoryParam param);
        void UpdateClosingQuantityPurchaseReturn(UpdateInventoryParam param);
        void UpdateClosingQuantityStockTransferOut(UpdateInventoryParam param);
        void UpdateClosingQuantityStockTransferIn(UpdateInventoryParam param);
        void UpdateClosingQuantityStockCombo(UpdateInventoryParam param);
        void UpdateInventoryForVoucherCheck(UpdateInventoryParam param);
    }
    public class StockRepository : RepositoryBase<Stock>, IStockRepository
    {
        public StockRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public void deleteByItemOptionID(Guid ItemOptionID)
        {
             DbContext.Database.ExecuteSqlCommand("SP_deleteByItemOptionID @itemOptionID", new SqlParameter("@itemOptionID", ItemOptionID));
        }

        public Stock getByBranchIDItemOptionID(Guid BranchID, Guid ItemOptionID)
        {
            return DbContext.Stock.Where(x=>x.BranchID==BranchID&&x.ItemOptionID==ItemOptionID).SingleOrDefault();
        }

        public IEnumerable<StockInventoryDetail> getStockDetail(Guid id)
        {
            return DbContext.Database.SqlQuery<StockInventoryDetail>("SP_SelectInventoryDetail @itemOptionID", new SqlParameter[] { new SqlParameter("@itemOptionID", id) });
        }

        public void UpdateClosingQuantityWhenImportItem(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateClosingQuantityWhenImportItem @inwardStockID,@BranchID",
                new SqlParameter("@inwardStockID", param.voucherID),
                new SqlParameter("@BranchID", param.BranchID)
            );
        }

        public void UpdateClosingQuantitySaleReturn(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateClosingQuantitySaleReturn @SaleOrderID,@BranchID",
                new SqlParameter("@SaleOrderID", param.voucherID),
                new SqlParameter("@BranchID", param.BranchID)
            );
        }

        public void UpdateClosingQuantityPurchaseReturn(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateClosingQuantityPurchaseReturn @inwardStockID,@BranchID",
                new SqlParameter("@inwardStockID", param.voucherID),
                new SqlParameter("@BranchID", param.BranchID)
            );
        }

        public void UpdateClosingQuantityStockTransferOut(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateStockTransferOut @StockTransferID,@BranchID",
                 new SqlParameter("@StockTransferID", param.voucherID),
                 new SqlParameter("@BranchID", param.BranchID)
             );
        }

        public void UpdateClosingQuantityStockTransferIn(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateStockTransferIn @StockTransferID,@BranchID",
                 new SqlParameter("@StockTransferID", param.voucherID),
                 new SqlParameter("@BranchID", param.BranchID)
             );
        }


        public void UpdateClosingQuantityStockCombo(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateStockCombo @voucherID,@BranchID",
                new SqlParameter("@voucherID", param.voucherID),
                new SqlParameter("@BranchID", param.BranchID)
            );
            
        }

        public void UpdateInventoryForVoucherCheck(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateInventoryForVoucherCheck @VoucherCheckID,@BranchID",
               new SqlParameter("@VoucherCheckID", param.voucherID),
               new SqlParameter("@BranchID", param.BranchID)
           );
        }
    }
}
