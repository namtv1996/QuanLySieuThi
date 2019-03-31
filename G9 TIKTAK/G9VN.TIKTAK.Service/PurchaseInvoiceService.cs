using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Service
{
    public interface IPurchaseInvoiceService
    {
        void Add(PurchaseInvoice purchaseInvoice);
        void Delete(Guid id);
        void Update(PurchaseInvoice purchaseInvoice);
        void DeleteInwardStock(Guid id);

        IEnumerable<PurchaseInvoice> GetAll();
        IEnumerable<PurchaseInvoice> GetByVoucherType(int id);
        IEnumerable<PurchaseInvoice> GetByVoucherType1(int id1,int id2);
        IEnumerable<PurchaseInvoice> GetByStatus(int id, int status);
        IEnumerable<PurchaseInvoice> GetByInwardStockID(int vouchertype, Guid inwardstockid);
        IEnumerable<PurchaseInvoice> GetByOriginalVoucherNo(int vouchertype, string voucherno);
        IEnumerable<PurchaseInvoice> GetByInwardStockIdAndStatus(int vouchertype, Guid inwardstockid, int status);
        PurchaseInvoice GetByID(Guid id);
        IEnumerable<PurchaseInvoice> GetPurchaseInvoiceBySaleReturn(string sr_voucherno);
        IEnumerable<PurchaseInvoice> GetPurchaseInvoiceByObjectID(int voucherType,Guid object_id);
        IEnumerable<PurchaseInvoice> GetVoucherByInwardStockID(int vouchertype1, int vouchertype2, Guid inwardstockid);

        string getCode(int id1, int id2);
        void SaveChanges();
    }
    public class PurchaseInvoiceService : IPurchaseInvoiceService
    {
        private IPurchaseInvoiceRepository _purchaseInvoiceRepository;
        private IUnitOfWork _unitOfWork;

        public PurchaseInvoiceService(IPurchaseInvoiceRepository purchaseInvoiceRepository, IUnitOfWork unitOfWork)
        {
            this._purchaseInvoiceRepository = purchaseInvoiceRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(PurchaseInvoice purchaseInvoice)
        {
            _purchaseInvoiceRepository.Add(purchaseInvoice);
        }

        public IEnumerable<PurchaseInvoice> GetAll()
        {
            return _purchaseInvoiceRepository.GetAll();
        }

        public PurchaseInvoice GetByID(Guid id)
        {
            return _purchaseInvoiceRepository.GetSingleById(id);
        }

        public IEnumerable<PurchaseInvoice> GetByVoucherType(int id)
        {
            return _purchaseInvoiceRepository.GetByVoucherType(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(PurchaseInvoice purchaseInvoice)
        {
            _purchaseInvoiceRepository.Update(purchaseInvoice);
        }

        public void Delete(Guid id)
        {
            _purchaseInvoiceRepository.Delete(id);
        }

        public IEnumerable<PurchaseInvoice> GetByStatus(int id, int status)
        {
            return _purchaseInvoiceRepository.GetByStatus(id, status);
        }

        public string getCode(int id1, int id2)
        {
            return _purchaseInvoiceRepository.GetCode(id1,id2);
        }

        public void DeleteInwardStock(Guid id)
        {
            _purchaseInvoiceRepository.DeleteInwardStock(id);
        }

        public IEnumerable<PurchaseInvoice> GetByInwardStockID(int vouchertype, Guid inwardstockid)
        {
            return _purchaseInvoiceRepository.GetByInwardStockID(vouchertype, inwardstockid);
        }

        public IEnumerable<PurchaseInvoice> GetByOriginalVoucherNo(int vouchertype, string voucherno)
        {
            return _purchaseInvoiceRepository.GetByOriginalVoucherNo(vouchertype, voucherno);
        }

        public IEnumerable<PurchaseInvoice> GetByInwardStockIdAndStatus(int vouchertype, Guid inwardstockid, int status)
        {
            return _purchaseInvoiceRepository.GetByInwardStockIdAndStatus(vouchertype, inwardstockid, status);
        }

        public IEnumerable<PurchaseInvoice> GetPurchaseInvoiceBySaleReturn(string sr_voucherno)
        {
            return _purchaseInvoiceRepository.GetPurchaseInvoiceBySaleReturn(sr_voucherno);
        }

        public IEnumerable<PurchaseInvoice> GetByVoucherType1(int id1, int id2)
        {
            return _purchaseInvoiceRepository.GetByVoucherType1(id1,id2);
        }

        public IEnumerable<PurchaseInvoice> GetPurchaseInvoiceByObjectID(int voucherType, Guid object_id)
        {
            return _purchaseInvoiceRepository.GetPurchaseInvoiceByObjectID(voucherType,object_id);
        }

        public IEnumerable<PurchaseInvoice> GetVoucherByInwardStockID(int vouchertype1, int vouchertype2, Guid inwardstockid)
        {
            return _purchaseInvoiceRepository.GetVoucherByInwardStockID(vouchertype1, vouchertype2, inwardstockid);
        }
    }
}
