using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IItemService
    {
        void Add(Item item);

        void Update(Item item);

        void Delete(Guid id);

        IEnumerable<Item> GetAll();
        IEnumerable<Item> GetAll(string key);

        IEnumerable<Item> GetAllPaging(int page, int pagesize, out int totalRow);

        Item GetByID(Guid id);

        void SaveChanges();
    }

    public class ItemService : IItemService
    {
        private IItemRepository _itemRepository;
        private IUnitOfWork _unitOfWork;
        
        public ItemService(IItemRepository itemRepository, IUnitOfWork unitOfWork)
        {
            this._itemRepository = itemRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(Item item)
        {
            _itemRepository.Add(item);
        }

        public void Delete(Guid id)
        {
            _itemRepository.Delete(id);
        }

        public IEnumerable<Item> GetAll()
        {
            return _itemRepository.GetAll();
        }

        public IEnumerable<Item> GetAll(string key)
        {
            return _itemRepository.GetAll(key);
        }

        public IEnumerable<Item> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _itemRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public Item GetByID(Guid id)
        {
            return _itemRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(Item item)
        {
            _itemRepository.Update(item);
        }
    }
}