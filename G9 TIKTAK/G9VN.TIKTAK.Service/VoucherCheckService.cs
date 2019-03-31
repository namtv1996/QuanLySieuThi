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
    public interface IVoucherCheckService
    {
        void Add(VoucherCheck voucherCheck);
        void Delete(Guid id);
        void Update(VoucherCheck voucherCheck);
        string GetCode();

        IEnumerable<VoucherCheck> GetAll();
        IEnumerable<VoucherCheck> GetByVoucherType(int id);
        IEnumerable<VoucherCheck> GetByStatus(bool status);

        VoucherCheck GetByID(Guid id);

        void SaveChanges();
    }
    public class VoucherCheckService:IVoucherCheckService
    {
        private IVoucherCheckRepository _voucherCheckRepository;
        private IUnitOfWork _unitOfWork;

        public VoucherCheckService(IVoucherCheckRepository voucherCheckRepository, IUnitOfWork unitOfWork)
        {
            this._voucherCheckRepository = voucherCheckRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(VoucherCheck voucherCheck)
        {
            _voucherCheckRepository.Add(voucherCheck);
        }

        public IEnumerable<VoucherCheck> GetAll()
        {
            return _voucherCheckRepository.GetAll();
        }

        public VoucherCheck GetByID(Guid id)
        {
            return _voucherCheckRepository.GetSingleById(id);
        }

        public IEnumerable<VoucherCheck> GetByVoucherType(int id)
        {
            return _voucherCheckRepository.GetByVoucherType(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(VoucherCheck voucherCheck)
        {
            _voucherCheckRepository.Update(voucherCheck);
        }

        public void Delete(Guid id)
        {
            _voucherCheckRepository.Delete(id);
        }

        public IEnumerable<VoucherCheck> GetByStatus(bool status)
        {
            return _voucherCheckRepository.GetByStatus(status);
        }

        public string GetCode()
        {
            return _voucherCheckRepository.GetCode();
        }
    }
}
