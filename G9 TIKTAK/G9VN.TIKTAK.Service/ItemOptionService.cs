using G9VN.TIKTAK.Common.ExcelViewModel;
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
    public interface IItemOptionService
    {
        void Add(ItemOption itemOption);

        void Update(ItemOption itemOption);

        void Delete(Guid id);
        List<AutoCopleteProduct> AutoComplete(Guid BranchID);
        IEnumerable<ItemOption> GetAll();
        IEnumerable<ItemOption> GetAll(string key);
       
        List<ItemOption> GetByItemCategoryID(Guid id);
        List<ItemOption> GetItem_SaleInvoice(Guid id);
        List<CartViewModel> GetItem_SaleInvoice1(Guid id);
        IEnumerable<ItemOption> GetAllPaging(int page, int pagesize, out int totalRow);
        List<ItemOtionViewModelExcel> GetListProduct(string keyword);
        ItemOption GetByID(Guid id);
        IEnumerable<ItemOption> GetByItemID(Guid id);
        List<ItemOptionByBranchIDViewModel> GetListItemOptionByBranchID(Guid BranchID);
        string getCode();
        void SaveChanges();

        int DeleteItemOption(Guid id, Guid itemid);
      
    }
    public class ItemOptionService: IItemOptionService
    {
        private IItemOptionRepository _itemOptionRepository;
        private IUnitOfWork _unitOfWork;

        public ItemOptionService(IItemOptionRepository itemOptionRepository, IUnitOfWork unitOfWork)
        {
            this._itemOptionRepository = itemOptionRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ItemOption itemOption)
        {
            _itemOptionRepository.Add(itemOption);
        }

        public void Delete(Guid id)
        {
            _itemOptionRepository.Delete(id);
        }

        public IEnumerable<ItemOption> GetAll()
        {
            return _itemOptionRepository.GetAll();
        }

        public IEnumerable<ItemOption> GetAll(string key)
        {
            return _itemOptionRepository.GetMulti(x=>x.Name.Contains(key)||x.Barcode==key||x.SKU.Contains(key));
        }

        public List<ItemOption> GetByItemCategoryID(Guid id)
        {
            return _itemOptionRepository.GetByItemCategory(id);
        }
        public List<ItemOption> GetItem_SaleInvoice(Guid id)
        {
            return _itemOptionRepository.GetItem_SaleInvoice(id);
        }
        public List<CartViewModel> GetItem_SaleInvoice1(Guid id)
        {
            return _itemOptionRepository.GetItem_SaleInvoice1(id);
        }
        public IEnumerable<ItemOption> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _itemOptionRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public ItemOption GetByID(Guid id)
        {
            return _itemOptionRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(ItemOption itemOption)
        {
            _itemOptionRepository.Update(itemOption);
        }

        public string getCode()
        {
            return _itemOptionRepository.GetCode();
        }

        public IEnumerable<ItemOption> GetByItemID(Guid id)
        {
            return _itemOptionRepository.GetByItemID(id);
        }

        public List<AutoCopleteProduct> AutoComplete(Guid BranchID)
        {
            return _itemOptionRepository.AutoComplete(BranchID);
        }

        public List<ItemOptionByBranchIDViewModel> GetListItemOptionByBranchID(Guid BranchID)
        {
            return _itemOptionRepository.GetListItemOptionByBranch(BranchID);
        }

        public int DeleteItemOption(Guid id, Guid itemid)
        {
            return _itemOptionRepository.DeleteItemOption(id, itemid);
        }

        public List<ItemOtionViewModelExcel> GetListProduct(string keyword)
        {
            List<ItemOtionViewModelExcel> query;
            if (!string.IsNullOrEmpty(keyword))
                query = null;
            else
                query = _itemOptionRepository.GetEX();
            return query.ToList();
        }
    }
}
