using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
namespace G9VN.TIKTAK.Service
{
    public interface ISalesPromotionService
    {
        void UpdateInventory(Guid ID);
        void Add(SalesPromotion salesPr);
        void Update(SalesPromotion salesPr);
        void Delete(Guid id);
        void SaveChanges();
        IEnumerable<SalesPromotion> GetAll();
        string getCode(string parentID);
        SalesPromotion GetByID(Guid id);
        IEnumerable<SalesPromotion> GetByVoucherID(Guid id);

    }
    public class SalesPromotionService : ISalesPromotionService
    {
        
        private ISalesPromotionRepository _salesPromotionRepository;
        private IUnitOfWork _unitOfWork;
        public SalesPromotionService(ISalesPromotionRepository salesPromotionRepository, IUnitOfWork unitOfWork)
        {
            this._salesPromotionRepository = salesPromotionRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(SalesPromotion salesPr)
        {
            _salesPromotionRepository.Add(salesPr);
        }

        public void Update(SalesPromotion salesPr)
        {
            _salesPromotionRepository.Update(salesPr);
        }

        public void Delete(Guid id)
        {
            _salesPromotionRepository.Delete(id);
        }

        public IEnumerable<SalesPromotion> GetAll()
        {
            return _salesPromotionRepository.GetAll();
        }


        public string getCode(string parentID)
        {
            return _salesPromotionRepository.GetCode(parentID);
        }


        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }


        public IEnumerable<SalesPromotion> GetByVoucherID(Guid id)
        {
            return _salesPromotionRepository.GetByVoucherID(id);
        }


        public SalesPromotion GetByID(Guid id)
        {
            return _salesPromotionRepository.GetSingleById(id);
        }

        public void UpdateInventory(Guid ID)
        {
            _salesPromotionRepository.UpdateInventory(ID);
        }
    }
}
