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
    public interface IPricePolicyService
    {
        void Add(PricePolicy pricePolicy);

        void Update(PricePolicy pricePolicy);

        void Delete(Guid id);

        IEnumerable<PricePolicy> GetAll();

        IEnumerable<PricePolicy> GetAllPaging(int page, int pagesize, out int totalRow);

        PricePolicy GetByID(Guid id);

        void SaveChanges();
    }

    public class PricePolicyService: IPricePolicyService
    {
        private IPricePolicyRepository _pricePolicyRepository;
        private IUnitOfWork _unitOfWork;

        public PricePolicyService(IPricePolicyRepository pricePolicyRepository, IUnitOfWork unitOfWork)
        {
            this._pricePolicyRepository = pricePolicyRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(PricePolicy pricePolicy)
        {
            _pricePolicyRepository.Add(pricePolicy);
        }

        public void Delete(Guid id)
        {
            _pricePolicyRepository.Delete(id);
        }

        public IEnumerable<PricePolicy> GetAll()
        {
            return _pricePolicyRepository.GetAll();
        }

        public IEnumerable<PricePolicy> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _pricePolicyRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public PricePolicy GetByID(Guid id)
        {
            return _pricePolicyRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(PricePolicy pricePolicy)
        {
            _pricePolicyRepository.Update(pricePolicy);
        }
    }
}
