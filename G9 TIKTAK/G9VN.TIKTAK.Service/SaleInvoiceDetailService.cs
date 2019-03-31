using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface ISaleInvoiceDetailService
    {
        void Add(SaleInvoiceDetail SaleInvoiceDetail);

        void Update(SaleInvoiceDetail SaleInvoiceDetail);
        void Delete(Guid id);

        IEnumerable<SaleInvoiceDetail> GetAll();
        IEnumerable<SaleInvoiceDetail> GetByVoucherID(Guid id);
        void DeleteByVoucherId(Guid id);
        IEnumerable<SaleInvoiceDetail> GetInventoryTransaction();
        SaleInvoiceDetail GetByID(Guid id);
        IEnumerable<SaleInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype);
        void SaveChanges();
    }
    public class SaleInvoiceDetailService : ISaleInvoiceDetailService
    {
        private ISaleInvoiceDetailRepository _SaleInvoiceDetailRepository;
        private IUnitOfWork _unitOfWork;

        public SaleInvoiceDetailService(ISaleInvoiceDetailRepository SaleInvoiceDetailRepository, IUnitOfWork unitOfWork)
        {
            this._SaleInvoiceDetailRepository = SaleInvoiceDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(SaleInvoiceDetail SaleInvoiceDetail)
        {
            _SaleInvoiceDetailRepository.Add(SaleInvoiceDetail);
        }

        public void Delete(Guid id)
        {
            _SaleInvoiceDetailRepository.Delete(id);
        }
        public void DeleteByVoucherId(Guid id)
        {
            _SaleInvoiceDetailRepository.DeleteByVoucherId(id);
        }
        public IEnumerable<SaleInvoiceDetail> GetAll()
        {
            return _SaleInvoiceDetailRepository.GetAll();
        }

        public SaleInvoiceDetail GetByID(Guid id)
        {
            return _SaleInvoiceDetailRepository.GetSingleById(id);
        }

        public IEnumerable<SaleInvoiceDetail> GetByVoucherID(Guid id)
        {
            return _SaleInvoiceDetailRepository.GetByVoucherID(id);
        }

        public IEnumerable<SaleInvoiceDetail> GetDetailByOriginalVoucherNo(string voucherno, int vouchertype)
        {
            return _SaleInvoiceDetailRepository.GetDetailByOriginalVoucherNo(voucherno, vouchertype);
        }

        public IEnumerable<SaleInvoiceDetail> GetInventoryTransaction()
        {
            return _SaleInvoiceDetailRepository.GetInventoryTransaction();
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(SaleInvoiceDetail SaleInvoiceDetail)
        {
            _SaleInvoiceDetailRepository.Update(SaleInvoiceDetail);
        }
    }
}