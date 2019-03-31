using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface ISalesPromotionDetailService
    {
        void Add(SalesPromotionDetail salesPrd);
        void Update(SalesPromotionDetail salesPrd);
        void Delete(Guid id);
        void SaveChanges();
        IEnumerable<SalesPromotionDetail> GetAll();
        SalesPromotionDetail GetByID(Guid id);
        IEnumerable<SalesPromotionDetail> GetByVoucherID(Guid id);
    }
    public class SalesPromotionDetailService: ISalesPromotionDetailService
    {
         private ISalesPromotionDetailRepository _salesPromotionDetailRepository;
        private IUnitOfWork _unitOfWork;
        public SalesPromotionDetailService(ISalesPromotionDetailRepository salesPromotionDetailRepository, IUnitOfWork unitOfWork)
        {
            this._salesPromotionDetailRepository = salesPromotionDetailRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(SalesPromotionDetail salesPrd)
        {
            _salesPromotionDetailRepository.Add(salesPrd);
        }
        public void Update(SalesPromotionDetail salesPrd)
        {
            _salesPromotionDetailRepository.Update(salesPrd);
        }

        public void Delete(Guid id)
        {
            _salesPromotionDetailRepository.Delete(id);
        }
        public IEnumerable<SalesPromotionDetail> GetAll()
        {
            return _salesPromotionDetailRepository.GetAll();
        }
        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }
        public SalesPromotionDetail GetByID(Guid id)
        {
            return _salesPromotionDetailRepository.GetSingleById(id);
        }
        public IEnumerable<SalesPromotionDetail> GetByVoucherID(Guid id)
        {
            return _salesPromotionDetailRepository.GetByVoucherID(id);
        }
    }
    
}
