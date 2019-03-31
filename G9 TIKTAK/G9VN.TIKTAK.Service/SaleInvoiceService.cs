using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface ISaleInvoiceService
    {
        void Add(SaleInvoice SaleInvoice);

        void Update(SaleInvoice SaleInvoice);
        void UpdateInventory(UpdateInventoryParam param);
        IEnumerable<SaleInvoice> GetAll();
        IEnumerable<SaleInvoice> GetByVoucherType(int id);
        IEnumerable<SaleInvoice> GetbyPromotionID(Guid id);
        IEnumerable<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2);
        IEnumerable<SaleInvoice> GetByStatusID(int id);
        IEnumerable<SaleInvoice> GetSaleInvoiceByObjectID(int vct1, int vct2, Guid object_id);
        //lấy ds phiếu thu
        IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no);
        //lấy ds phiếu đóng gói
        IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno);
        IEnumerable<SaleInvoice> GetVoucherBySaleOrderVoucherNo(string voucher_no, int vct1, int vct2);

        //lấy ds phiếu thu với thông tin thêm
        IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID);
        SaleInvoice GetByVoucherNo(string key);
       
       
        SaleInvoice GetByID(Guid id);
      
        List<ReportHomeViewModel> reportHome();
        void SaveChanges();
        string getCode(int id1,int id2);
       
        List<SaleInvoice1ViewModel> GetSaleInvoiceByItemOptionID(Guid? ItemOptionID, int number);
        //lấy ds đơn hàng theo chi nhánh
        List<SaleInvoice> SelectSaleOrderByBranchID(Guid BranchID);
        List<SaleInvoice> SelectSaleOrder10ByBranchID(Guid BranchID);
        List<SP_SelectSaleOrderByObjectViewModel> SelectSaleOrderObject(Guid ObjectID);
        List<SaleInvoice> SelectSaleOrder12ByBranchID(Guid BranchID);

        //giao hàng
        List<DeliveryOrderViewModel> GetAllDeliveryOrder(Guid? BranchID);
        DeliveryOrderViewModel GetDeliveryOrderById(Guid id);

    }
    public class SaleInvoiceService : ISaleInvoiceService
    {
        private ISaleInvoiceRepository _SaleInvoiceRepository;
        private IUnitOfWork _unitOfWork;

        public SaleInvoiceService(ISaleInvoiceRepository SaleInvoiceRepository, IUnitOfWork unitOfWork)
        {
            this._SaleInvoiceRepository = SaleInvoiceRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(SaleInvoice SaleInvoice)
        {
            _SaleInvoiceRepository.Add(SaleInvoice);
        }

        public IEnumerable<SaleInvoice> GetAll()
        {
            return _SaleInvoiceRepository.GetAll();
        }

        public List<DeliveryOrderViewModel> GetAllDeliveryOrder(Guid? BranchID)
        {
            return _SaleInvoiceRepository.GetAllDeliveryOrder(BranchID);
        }

        public IEnumerable<ReceiptViewModel> GetAllReceipt(Guid BranchID)
        {
            return _SaleInvoiceRepository.GetAllReceipt(BranchID);
        }

        public SaleInvoice GetByID(Guid id)
        {
            return _SaleInvoiceRepository.GetSingleById(id);
        }

        public IEnumerable<SaleInvoice> GetByOriginalVoucherNo(string original_voucher_no)
        {
            return _SaleInvoiceRepository.GetByOriginalVoucherNo(original_voucher_no);
        }

        public IEnumerable<SaleInvoice> GetbyPromotionID(Guid id)
        {
            return _SaleInvoiceRepository.GetbyPromotionID(id);
        }

        public IEnumerable<SaleInvoice> GetByStatusID(int id)
        {
            return _SaleInvoiceRepository.GetByStatusID(id);
        }
        public SaleInvoice GetByVoucherNo(string key)
        {
            return _SaleInvoiceRepository.GetByVoucherNo(key);
        }
        public IEnumerable<SaleInvoice> GetByVoucherType(int id)
        {
            return _SaleInvoiceRepository.GetByVoucherType(id);
        }
        //lấy saleinvoice theo khoảng vouchertype
        public IEnumerable<SaleInvoice> GetByVoucherType1(int vouchertype1, int vouchertype2)
        {
            return _SaleInvoiceRepository.GetByVoucherType1(vouchertype1, vouchertype2);
        }

        public string getCode(int id1, int id2)
        {
            return _SaleInvoiceRepository.GetCode(id1,id2);
        }

        public DeliveryOrderViewModel GetDeliveryOrderById(Guid id)
        {
            return _SaleInvoiceRepository.GetDeliveryOrderById(id);
        }

        public IEnumerable<SaleInvoice> GetPackageByOriginalVoucherNo(string originalvoucherno)
        {
            return _SaleInvoiceRepository.GetPackageByOriginalVoucherNo(originalvoucherno);
        }

        public List<SaleInvoice1ViewModel> GetSaleInvoiceByItemOptionID(Guid? ItemOptionID, int number) 
        {
            return _SaleInvoiceRepository.GetSaleInvoiceByItemOptionID(ItemOptionID,number);
        }

        public IEnumerable<SaleInvoice> GetSaleInvoiceByObjectID(int vct1, int vct2, Guid object_id)
        {
            return _SaleInvoiceRepository.GetSaleInvoiceByObjectID(vct1, vct2, object_id);
        }

        public IEnumerable<SaleInvoice> GetVoucherBySaleOrderVoucherNo(string voucher_no, int vct1, int vct2)
        {
            return _SaleInvoiceRepository.GetVoucherBySaleOrderVoucherNo(voucher_no,vct1,vct2);
        }

       

        public List<ReportHomeViewModel> reportHome()
        {
            return _SaleInvoiceRepository.reportHome();
        }
        
        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public List<SaleInvoice> SelectSaleOrder10ByBranchID(Guid BranchID)
        {
            return _SaleInvoiceRepository.SelectSaleOrder10ByBranchID(BranchID);
        }

        public List<SaleInvoice> SelectSaleOrder12ByBranchID(Guid BranchID)
        {
            return _SaleInvoiceRepository.SelectSaleOrder12ByBranchID(BranchID);
        }

        public List<SaleInvoice> SelectSaleOrderByBranchID(Guid BranchID)
        {
            return _SaleInvoiceRepository.SelectSaleOrderByBranchID(BranchID);
        }

        public List<SP_SelectSaleOrderByObjectViewModel> SelectSaleOrderObject(Guid ObjectID)
        {
            return _SaleInvoiceRepository.SelectSaleOrderByObject(ObjectID);
        }

        public void Update(SaleInvoice SaleInvoice)
        {
            _SaleInvoiceRepository.Update(SaleInvoice);
        }

        public void UpdateInventory(UpdateInventoryParam param)
        {
            _SaleInvoiceRepository.UpdateInventory(param);
        }
    }
}
