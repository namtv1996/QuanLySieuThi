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
    public interface IItemTransferService
    {
        void Add(StockTransfer itemTransfer);
        void Delete(Guid id);
        void Update(StockTransfer itemTransfer);
        void SaveChanges();
        string getCode(string parentID);
        IEnumerable<StockTransfer> GetAll();
       StockTransfer GetByID(Guid id);
        StockTransfer GetByVoucherID(Guid id);
    }
    public class ItemTransferService : IItemTransferService
    {
        private IItemTransferRepository _itemTransferRepository;
        private IUnitOfWork _unitOfWork;
        public ItemTransferService(IUnitOfWork unitOfWork, IItemTransferRepository appstockRepository)
        {
            this._itemTransferRepository = appstockRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(StockTransfer itemTransfer)
        {
            _itemTransferRepository.Add(itemTransfer);
        }

        public void Delete(Guid id)
        {
            _itemTransferRepository.Delete(id);
        }

        public IEnumerable<StockTransfer> GetAll()
        {
            return _itemTransferRepository.GetAll();
        }

        public StockTransfer GetByID(Guid id)
        {
            return _itemTransferRepository.GetSingleById(id);
        }

        public StockTransfer GetByVoucherID(Guid id)
        {
            return _itemTransferRepository.GetByVoucherID(id);
        }

        public string getCode(string parentID)
        {
            return _itemTransferRepository.GetCode(parentID);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(StockTransfer itemTransfer)
        {
            _itemTransferRepository.Update(itemTransfer);
        }
    }
}