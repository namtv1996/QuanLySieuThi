using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Common.ViewsModel;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Data.SqlClient;
using G9VN.TIKTAK.Web.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface ISaleInvoiceRepository : IRepository<SaleInvoice>
    {

        List<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2);
        IEnumerable<SaleInvoice> GetByVoucherType(int id);
        IEnumerable<SaleInvoice> GetByStatusID(int sid);
        IEnumerable<SaleInvoice> GetbyPromotionID(Guid id);
        //lấy ds phiếu thu
        IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no);
        //lấy ds phiếu đóng gói
        IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno);
        //lấy ds phiếu thu với thông tin thêm
        IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID);
        SaleInvoice GetByVoucherNo(string key);

        string GetCode(int id1, int id2);
        IEnumerable<SaleInvoice> GetVoucherBySaleOrderVoucherNo(string voucher_no, int vct1, int vct2);
        IEnumerable<SaleInvoice> GetSaleInvoiceByObjectID(int vct1, int vct2, Guid object_id);


        //cập nhật tồn kho tùy chọn theo chi nhánh
        void UpdateInventory(UpdateInventoryParam param);
        //lấy các đơn hàng chưa xuất kho có tùy chọn x
        List<SaleInvoice1ViewModel> GetSaleInvoiceByItemOptionID(Guid? ItemOptionID, int number);


        // báo cáo
        List<OrderStatisticsViewModel> ReportOrderStatistics(Guid branchid, DateTime? date1, DateTime? date2);
        List<SaleByDateViewModel> ReportSaleByDate(Guid branchid, DateTime voucherdate1, DateTime voucherdate2);
        List<SaleByEmployeeViewModel> ReportSaleByEmployee(DateTime? date1, DateTime? date2, Guid? branchid);
        List<SaleByBranchViewModel> ReportSaleByBranch(DateTime? date1, DateTime? date2);
       
        List<BestSellViewModel> ReportBestSell(Guid branchid, DateTime? date1, DateTime? date2);
        List<ReportHomeViewModel> reportHome();
        ReportHomeNewViewModel reportHomeNew();
        List<ByEndDayStatisticViewModel> GetByEndDayStatistic(Guid branchid, DateTime? voucherdate1, DateTime? voucherdate2);
        List<SaleInvoice> GetSaleInvoiceByStatusAndBranch(Guid branchid, int status, DateTime? voucherdate1, DateTime? voucherdate2);
        List<SaleOrderReturnViewModel> ReportSaleOrderReturn(Guid branchid, DateTime? date1, DateTime? date2);

        //lay ds don hang theo chi nhanh
        List<SaleInvoice> SelectSaleOrderByBranchID(Guid BranchID);
        List<SaleInvoice> SelectSaleOrder10ByBranchID(Guid BranchID);
        List<SP_SelectSaleOrderByObjectViewModel> SelectSaleOrderByObject(Guid ObjectID);
        List<SaleInvoice> SelectSaleOrder12ByBranchID(Guid BranchID);

        //giao hàng
        List<DeliveryOrderViewModel> GetAllDeliveryOrder(Guid? BranchID);
        DeliveryOrderViewModel GetDeliveryOrderById(Guid id);
    }

    public class SaleInvoiceRepository : RepositoryBase<SaleInvoice>, ISaleInvoiceRepository
    {
        public SaleInvoiceRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<SaleInvoice> GetByVoucherType(int id)
        {
            return this.DbContext.SaleInvoice.Where(x => x.VoucherType == id);
        }
        public string GetCode(int id1, int id2)
        {

            List<SaleInvoice> ls = GetByVoucherType1(id1, id2);
            if (ls.Count() == 0)
            {
                return "";
            }
            List<SaleInvoice> ls2 = ls.OrderByDescending(x => x.VoucherNo).ToList();
            return ls2[0].VoucherNo;
        }

        public List<ByEndDayStatisticViewModel> GetByEndDayStatistic(Guid branchid, DateTime? voucherdate1, DateTime? voucherdate2)
        {          
            try
            {
                var list1 = DbContext.Database.SqlQuery<ByEndDayStatisticViewModel>("ByEndDayStatistic @branchid,@voucherdate1,@voucherdate2",
                    new SqlParameter("@branchid", branchid),
                    new SqlParameter("@voucherdate1", voucherdate1),
                    new SqlParameter("@voucherdate2", voucherdate2)
                ).ToList();               
                return list1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public IEnumerable<SaleInvoice> GetByStatusID(int sid)
        {
            return this.DbContext.SaleInvoice.Where(x => x.StatusID == sid);
        }

        //lay tat ca cac phieu thu theo chung tu goc
        public IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no)
        {
            return this.DbContext.SaleInvoice.Where(x => x.OriginalVoucherNo == original_voucher_no && x.VoucherType >= 20 && x.VoucherType <= 25).OrderBy(x => x.VoucherNo);
        }

        public SaleInvoice GetByVoucherNo(string key)
        {
            return this.DbContext.SaleInvoice.Where(x => x.VoucherNo == key).Single();
        }

        public List<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2)
        {
            return this.DbContext.SaleInvoice.Where(x => x.VoucherType >= vouchertype1 && x.VoucherType <= vouchertype2).OrderByDescending(x => x.InvDate).ToList();
        }

        public List<OrderStatisticsViewModel> ReportOrderStatistics(Guid branchid, DateTime? date1, DateTime? date2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@branchid",branchid),
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2)
                };

                var result = DbContext.Database.SqlQuery<OrderStatisticsViewModel>("reportOrderStatistics @branchid,@date1,@date2", parameters).ToList();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<SaleByDateViewModel> ReportSaleByDate(Guid branchid, DateTime voucherdate1, DateTime voucherdate2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@branchid",branchid),
                    new SqlParameter("@voucherdate1",voucherdate1),
                    new SqlParameter("@voucherdate2",voucherdate2)
                };

                var result = DbContext.Database.SqlQuery<SaleByDateViewModel>("reportSaleByDate @branchid,@voucherdate1,@voucherdate2", parameters).ToList();

                return result.OrderByDescending(x => x.voucherDate).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno)
        {
            return this.DbContext.SaleInvoice.Where(x => x.OriginalVoucherNo == originalvoucherno && x.VoucherType >= 30 && x.VoucherType <= 31);
        }

        public IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID)
        {
            List<ReceiptViewModel> list = new List<ReceiptViewModel>();
            var result = DbContext.Database.SqlQuery<ReceiptViewModel>("SP_GetAllReceipt @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
            for (int i = 0; i < result.Count; i++)
            {
                list.Add(result[i]);
            }
            var result1 = DbContext.Database.SqlQuery<ReceiptViewModel>("SP_GetAllReceiptFromPurchaseInvoice @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
            for (int i = 0; i < result1.Count; i++)
            {
                list.Add(result1[i]);
            }
            var result2 = DbContext.Database.SqlQuery<ReceiptViewModel>("SP_GetReceiptDebtOfCustomer @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
            for (int i = 0; i < result2.Count; i++)
            {
                list.Add(result2[i]);
            }
            return list.OrderByDescending(x => x.VoucherDate).ToList();

        }

        public List<SaleByEmployeeViewModel> ReportSaleByEmployee(DateTime? date1, DateTime? date2, Guid? branchid)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2),
                    new SqlParameter("@branchid",branchid)
                };
                var result = DbContext.Database.SqlQuery<SaleByEmployeeViewModel>("reportSaleByEmployee @date1,@date2,@branchid", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
      
        public List<BestSellViewModel> ReportBestSell(Guid branchid, DateTime? date1, DateTime? date2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@branchid",branchid),
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2)
                };
                var result = DbContext.Database.SqlQuery<BestSellViewModel>("reportBestSell @branchid,@date1,@date2", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<ReportHomeViewModel> reportHome()
        {
            try
            {
                var result = DbContext.Database.SqlQuery<ReportHomeViewModel>("reportHome").ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public ReportHomeNewViewModel reportHomeNew()
        {
            try
            {
                var result = DbContext.Database.SqlQuery<ReportHomeNewViewModel>("reportHomeNew").Single();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public void UpdateInventory(UpdateInventoryParam param)
        {
            DbContext.Database.ExecuteSqlCommand("SP_UpdateClosingQuantity @SaleOrderID,@BranchID",
                new SqlParameter("@SaleOrderID", param.voucherID),
                new SqlParameter("@BranchID", param.BranchID)
            );
        }
        public IEnumerable<SaleInvoice> GetVoucherBySaleOrderVoucherNo(string voucher_no, int vct1, int vct2)
        {
            return this.DbContext.SaleInvoice.Where(x => x.OriginalVoucherNo == voucher_no && x.VoucherType >= vct1 && x.VoucherType <= vct2);
        }

        public IEnumerable<SaleInvoice> GetSaleInvoiceByObjectID(int vct1, int vct2, Guid object_id)
        {
            return this.DbContext.SaleInvoice.Where(x => x.ObjectID == object_id && x.VoucherType >= vct1 && x.VoucherType <= vct2);
        }

        public List<SaleInvoice1ViewModel> GetSaleInvoiceByItemOptionID(Guid? ItemOptionID, int number)
        {
            try
            {
                return DbContext.Database.SqlQuery<Common.ViewsModel.SaleInvoice1ViewModel>("SP_GetFromSaleInvoiceWhereItemOptionID @ItemOptionID,@number", new SqlParameter("@ItemOptionID", ItemOptionID), new SqlParameter("@number", number)).ToList();
            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public List<SaleInvoice> SelectSaleOrderByBranchID(Guid BranchID)
        {
            return this.DbContext.Database.SqlQuery<SaleInvoice>("SP_SelectSaleOrderByBranchID @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
        }

        public List<SaleInvoice> GetSaleInvoiceByStatusAndBranch(Guid branchid, int status, DateTime? voucherdate1, DateTime? voucherdate2)
        {
            List<SaleInvoice> list = new List<SaleInvoice>();
            if (status == 1)
            {
                var result = this.DbContext.SaleInvoice.Where(x => x.BranchID == branchid && x.StatusID == 1
                && (x.VoucherType >= 10 && x.VoucherType <= 14) && (x.VoucherDate >= voucherdate1 && x.VoucherDate <= voucherdate2)).ToList();
                for (int j = 0; j < result.Count; j++) { list.Add(result[j]); }
            }
            else
            {
                if (status == 7)
                {
                    var result = this.DbContext.SaleInvoice.Where(x => x.BranchID == branchid && x.StatusID == 7
                    && (x.VoucherType >= 10 && x.VoucherType <= 14) && (x.VoucherDate >= voucherdate1 && x.VoucherDate <= voucherdate2)).ToList();
                    for (int j = 0; j < result.Count; j++) { list.Add(result[j]); }
                }

                if (status == 10)
                {
                    var result = this.DbContext.SaleInvoice.Where(x => x.BranchID == branchid && x.StatusID == 10
                    && (x.VoucherType >= 10 && x.VoucherType <= 14) && (x.VoucherDate >= voucherdate1 && x.VoucherDate <= voucherdate2)).ToList();
                    for (int j = 0; j < result.Count; j++) { list.Add(result[j]); }
                }

                if (status == 5)
                {
                    var result = this.DbContext.SaleInvoice.Where(x => x.BranchID == branchid && (x.VoucherType >= 10 && x.VoucherType <= 14)
                    && ((x.StatusID >= 2 && x.StatusID <= 5) || x.StatusID == 8 || x.StatusID == 9 || x.StatusID == 15 || x.StatusID == 45 || x.StatusID == 95)
                    && (x.VoucherDate >= voucherdate1 && x.VoucherDate <= voucherdate2)).ToList();
                    for (int j = 0; j < result.Count; j++) { list.Add(result[j]); }
                }

                if (status == 6)
                {
                    var result = this.DbContext.SaleInvoice.Where(x => x.BranchID == branchid && x.VoucherType == 7
                    && (x.StatusID == 1 || x.StatusID == 4 || x.StatusID == 5)
                    && (x.VoucherDate >= voucherdate1 && x.VoucherDate <= voucherdate2)).ToList();
                    for (int j = 0; j < result.Count; j++) { list.Add(result[j]); }
                }
            }

            return list;
        }

        public List<SaleInvoice> SelectSaleOrder10ByBranchID(Guid BranchID)
        {
            return this.DbContext.Database.SqlQuery<SaleInvoice>("SP_SelectSaleOrder10ByBranchID @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
        }

        public List<SaleInvoice> SelectSaleOrder12ByBranchID(Guid BranchID)
        {
            return this.DbContext.Database.SqlQuery<SaleInvoice>("SP_SelectSaleOrder12ByBranchID @BranchID", new SqlParameter("@BranchID", BranchID)).ToList();
        }

        public List<SaleByBranchViewModel> ReportSaleByBranch(DateTime? date1, DateTime? date2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2)
                };
                var result = DbContext.Database.SqlQuery<SaleByBranchViewModel>("reportSaleByBranch @date1,@date2", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<SaleOrderReturnViewModel> ReportSaleOrderReturn(Guid branchid, DateTime? date1, DateTime? date2)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@branchid",branchid),
                    new SqlParameter("@date1",date1),
                    new SqlParameter("@date2",date2)
                };
                var result = DbContext.Database.SqlQuery<SaleOrderReturnViewModel>("reportSaleOrderReturn @branchid,@date1,@date2", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<DeliveryOrderViewModel> GetAllDeliveryOrder(Guid? BranchID)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@BranchID",BranchID),                   
                };
                var result = DbContext.Database.SqlQuery<DeliveryOrderViewModel>("ViewListDeliveryVoucher @BranchID", parameters).ToList();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public IEnumerable<SaleInvoice> GetbyPromotionID(Guid id)
        {
            return this.DbContext.SaleInvoice.Where(x => x.PromotionID ==id);
        }

        public DeliveryOrderViewModel GetDeliveryOrderById(Guid id)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@VoucherID",id),
                };
                var result = DbContext.Database.SqlQuery<DeliveryOrderViewModel>("GetDeliveryVoucherById @VoucherID", parameters).Single();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<SP_SelectSaleOrderByObjectViewModel> SelectSaleOrderByObject(Guid ObjectID)
        {
            return this.DbContext.Database.SqlQuery<SP_SelectSaleOrderByObjectViewModel>("SP_SelectSaleOrderByObject @ObjectID", new SqlParameter("@ObjectID", ObjectID)).ToList();
        }
    }
}