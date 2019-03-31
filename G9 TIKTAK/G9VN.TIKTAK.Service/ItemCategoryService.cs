using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IItemCategoryService
    {
        IEnumerable<ItemCategory> GetAll(string key);
        void Add(ItemCategory ItemCategory);

        void Update(ItemCategory ItemCategory);

        void Delete(Guid id);

        IEnumerable<ItemCategory> GetAll();

        IEnumerable<ItemCategory> GetAllPaging(int page, int pagesize, out int totalRow);

        ItemCategory GetByID(Guid id);

        void SaveChanges();
    }

    public class ItemCategoryService : IItemCategoryService
    {
        private IItemCategoryRepository _itemCategoryRepository;
        private IUnitOfWork _unitOfWork;

        public ItemCategoryService(IItemCategoryRepository itemCategoryRepository, IUnitOfWork unitOfWork)
        {
            this._itemCategoryRepository = itemCategoryRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ItemCategory itemCategory)
        {
            _itemCategoryRepository.Add(itemCategory);
        }

        public void Delete(Guid id)
        {
            _itemCategoryRepository.Delete(id);
        }

        public IEnumerable<ItemCategory> GetAll()
        {
            return _itemCategoryRepository.GetAll();
        }

        public IEnumerable<ItemCategory> GetAll(string key)
        {
            return _itemCategoryRepository.GetAll(key);
        }

        public IEnumerable<ItemCategory> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _itemCategoryRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public ItemCategory GetByID(Guid id)
        {
            return _itemCategoryRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(ItemCategory itemCategory)
        {
            _itemCategoryRepository.Update(itemCategory);
        }
    }
}