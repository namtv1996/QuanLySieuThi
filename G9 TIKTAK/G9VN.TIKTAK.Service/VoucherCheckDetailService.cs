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
    public interface IVoucherCheckDetailService
    {
        void Add(VoucherCheckDetail voucherCheckDetail);
        void Delete(Guid id);
        void Update(VoucherCheckDetail voucherCheckDetail);

        IEnumerable<VoucherCheckDetail> GetAll();
        IEnumerable<VoucherCheckDetail> GetByVoucherID(Guid id);
      

        VoucherCheckDetail GetByID(Guid id);

        void SaveChanges();
    }
    public class VoucherCheckDetailService : IVoucherCheckDetailService
    {
        private IVoucherCheckDetailRepository _voucherCheckDetailRepository;
        private IUnitOfWork _unitOfWork;

        public VoucherCheckDetailService(IVoucherCheckDetailRepository voucherCheckDetailRepository, IUnitOfWork unitOfWork)
        {
            this._voucherCheckDetailRepository = voucherCheckDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(VoucherCheckDetail voucherCheckDetail)
        {
            _voucherCheckDetailRepository.Add(voucherCheckDetail);
        }

        public void Delete(Guid id)
        {
            _voucherCheckDetailRepository.Delete(id);
        }

        public IEnumerable<VoucherCheckDetail> GetAll()
        {
            return _voucherCheckDetailRepository.GetAll();
        }

        public VoucherCheckDetail GetByID(Guid id)
        {
            return _voucherCheckDetailRepository.GetSingleById(id);
        }

        public IEnumerable<VoucherCheckDetail> GetByVoucherID(Guid id)
        {
            return _voucherCheckDetailRepository.GetByVoucherID(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(VoucherCheckDetail voucherCheckDetail)
        {
            _voucherCheckDetailRepository.Update(voucherCheckDetail);
        }
    }
}
