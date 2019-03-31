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
    public interface IItemTransferDetailService
    {
        void Add(StockTransferDetail itemTransferDetail);
        void Delete(Guid id);
        void Update(StockTransferDetail itemTransferDetail);
        void SaveChanges();
        IEnumerable<StockTransferDetail> GetAll();
        IEnumerable<StockTransferDetail> GetByVoucherID(Guid id);
        StockTransferDetail GetByID(Guid id);

    }
    public class ItemTransferDetailService : IItemTransferDetailService
    {
        private IItemTransferDetailRepository _itemTransferDetailRepository;
        private IUnitOfWork _unitOfWork;
        public ItemTransferDetailService(IUnitOfWork unitOfWork, IItemTransferDetailRepository appstockDetailRepository)
        {
            this._itemTransferDetailRepository = appstockDetailRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(StockTransferDetail itemTransferDetail)
        {
            _itemTransferDetailRepository.Add(itemTransferDetail);
        }

        public void Delete(Guid id)
        {
            _itemTransferDetailRepository.Delete(id);
        }

        public IEnumerable<StockTransferDetail> GetAll()
        {
            return _itemTransferDetailRepository.GetAll();
        }

        public StockTransferDetail GetByID(Guid id)
        {
            return _itemTransferDetailRepository.GetSingleById(id);
        }

        public IEnumerable<StockTransferDetail> GetByVoucherID(Guid id)
        {
            return _itemTransferDetailRepository.GetByVoucherID(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(StockTransferDetail itemTransferDetail)
        {
            _itemTransferDetailRepository.Update(itemTransferDetail);
        }
    }
}
