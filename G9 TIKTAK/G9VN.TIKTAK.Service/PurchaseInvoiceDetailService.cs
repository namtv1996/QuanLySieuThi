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
    public interface IPurchaseInvoiceDetailService
    {
        void Add(PurchaseInvoiceDetail purchaseInvoiceDetail);

        void Update(PurchaseInvoiceDetail purchaseInvoiceDetail);
        IEnumerable<PurchaseInvoiceDetail> GetDetailByInwardStockID(Guid id, int vouchertype,int vct);
        IEnumerable<PurchaseInvoiceDetail> GetAll();
        IEnumerable<PurchaseInvoiceDetail> GetByVoucherID(Guid id);
        IEnumerable<PurchaseInvoiceDetail> GetInventoryTransaction(int voucher_type,int voucher_type2);
        IEnumerable<PurchaseInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype, int vct);
        PurchaseInvoiceDetail GetByID(Guid id);

        void SaveChanges();
        void DeleteMultiByVoucherID(Guid voucher_id);
    }
    public class PurchaseInvoiceDetailService : IPurchaseInvoiceDetailService
    {
        private IPurchaseInvoiceDetailRepository _purchaseInvoicekDetailRepository;
        private IUnitOfWork _unitOfWork;

        public PurchaseInvoiceDetailService(IPurchaseInvoiceDetailRepository purchaseInvoicekDetailRepository, IUnitOfWork unitOfWork)
        {
            this._purchaseInvoicekDetailRepository = purchaseInvoicekDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(PurchaseInvoiceDetail purchaseInvoiceDetail)
        {
            _purchaseInvoicekDetailRepository.Add(purchaseInvoiceDetail);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetAll()
        {
            return _purchaseInvoicekDetailRepository.GetAll();
        }

        public PurchaseInvoiceDetail GetByID(Guid id)
        {
            return _purchaseInvoicekDetailRepository.GetSingleById(id);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetByVoucherID(Guid id)
        {
            return _purchaseInvoicekDetailRepository.GetByVoucherID(id);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetInventoryTransaction(int voucher_type, int voucher_type2)
        {
            return _purchaseInvoicekDetailRepository.GetInventoryTransaction(voucher_type, voucher_type2);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetDetailByInwardStockID(Guid id, int vouchertype,int vct)
        {
            return _purchaseInvoicekDetailRepository.GetDetailByInwardStockID(id,vouchertype,vct);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(PurchaseInvoiceDetail purchaseInvoiceDetail)
        {
            _purchaseInvoicekDetailRepository.Update(purchaseInvoiceDetail);
        }

        public IEnumerable<PurchaseInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype, int vct)
        {
            return _purchaseInvoicekDetailRepository.GetDetailByOriginalVoucherNo(voucherno, vouchertype, vct);
        }

        public void DeleteMultiByVoucherID(Guid voucher_id)
        {
            _purchaseInvoicekDetailRepository.DeleteMultiByVoucherID(voucher_id);
        }
    }
}
