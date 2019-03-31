using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IStockService
    {
        void Add(Stock stock);
        void Update(Stock stock);
        void Delete(Guid id);
        void deleteByItemOptionID(Guid ItemOptionID);
        void UpdateClosingQuantityWhenImportItem(UpdateInventoryParam param);
        void UpdateClosingQuantitySaleReturn(UpdateInventoryParam param);
        void UpdateClosingQuantityPurchaseReturn(UpdateInventoryParam param);
        void UpdateClosingQuantityStockTransferOut(UpdateInventoryParam param);
        void UpdateClosingQuantityStockTransferIn(UpdateInventoryParam param);
        void UpdateClosingQuantityStockCombo(UpdateInventoryParam param);
        void UpdateInventoryForVoucherCheck(UpdateInventoryParam param);
        IEnumerable<Stock> GetAll();
        Stock GetByID(Guid id);
        IEnumerable<StockInventoryDetail> getStockDetail(Guid id);
        Stock getByBranchIDItemOptionID(Guid BranchID, Guid ItemOptionID);
        void SaveChanges();
    }
    public class StockService : IStockService
    {

        private IStockRepository _stockRepository;
        private IUnitOfWork _unitOfWork;

        //tiem su phu thuoc tu G9VN.TIKTAK.Data thong qua interface IBranchRepository
        //tiem su phu thuoc tu G9VN.TIKTAK.UnitTest thong qua interface IUnitOfWork
        // thong qua DI Autofac _branchRepository se duoc khoi tao la doi tuong cua BranchRepository (_branchRepository = new BranchRepository)
        public StockService(IStockRepository stockRepository, IUnitOfWork unitOfWork)
        {
            this._stockRepository = stockRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(Stock stock)
        {
            _stockRepository.Add(stock);
        }

        public void Delete(Guid id)
        {
            _stockRepository.Delete(id);
        }

        public void deleteByItemOptionID(Guid ItemOptionID)
        {
            _stockRepository.deleteByItemOptionID(ItemOptionID);
        }

        public IEnumerable<Stock> GetAll()
        {
            return _stockRepository.GetAll();
        }

        public Stock getByBranchIDItemOptionID(Guid BranchID, Guid ItemOptionID)
        {
            return _stockRepository.getByBranchIDItemOptionID(BranchID, ItemOptionID);
        }

        public Stock GetByID(Guid id)
        {
            return _stockRepository.GetSingleById(id);
        }

        public IEnumerable<StockInventoryDetail> getStockDetail(Guid id)
        {
            return _stockRepository.getStockDetail(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(Stock stock)
        {
            _stockRepository.Update(stock);
        }

        public void UpdateClosingQuantityPurchaseReturn(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantityPurchaseReturn(param);
        }

        public void UpdateClosingQuantitySaleReturn(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantitySaleReturn(param);
        }

        public void UpdateClosingQuantityStockTransferIn(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantityStockTransferIn(param);
        }

        public void UpdateClosingQuantityStockTransferOut(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantityStockTransferOut(param);
        }

        public void UpdateClosingQuantityWhenImportItem(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantityWhenImportItem(param);
        }


        public void UpdateClosingQuantityStockCombo(UpdateInventoryParam param)
        {
            _stockRepository.UpdateClosingQuantityStockCombo(param);
        }

        public void UpdateInventoryForVoucherCheck(UpdateInventoryParam param)
        {
            _stockRepository.UpdateInventoryForVoucherCheck(param);
        }
    }
}