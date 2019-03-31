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
    public interface IPosService
    {
        void Add(ItemOption itemOption);

        void Update(ItemOption itemOption);

        void Delete(Guid id);

        IEnumerable<ItemOption> GetAll();
        IEnumerable<ItemOption> GetAll(string key);

        List<ItemOption> GetByItemCategoryID(Guid id);
        List<ItemOption> GetItem_SaleInvoice(Guid id);
        List<CartViewModel> GetItem_SaleInvoice1(Guid id);
        IEnumerable<ItemOption> GetAllPaging(int page, int pagesize, out int totalRow);

        ItemOption GetByID(Guid id);
        IEnumerable<ItemOption> GetByItemID(Guid id);
  
        string getCode();
        void SaveChanges();

    }
    public class PosService : IPosService
    {
        private IPosRepository _posRepository;
        private IUnitOfWork _unitOfWork;

        public PosService(IPosRepository itemOptionRepository, IUnitOfWork unitOfWork)
        {
            this._posRepository = itemOptionRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ItemOption itemOption)
        {
            _posRepository.Add(itemOption);
        }

        public void Delete(Guid id)
        {
            _posRepository.Delete(id);
        }

        public IEnumerable<ItemOption> GetAll()
        {
            return _posRepository.GetAll();
        }

        public IEnumerable<ItemOption> GetAll(string key)
        {
            return _posRepository.GetMulti(x => x.Name.Contains(key) || x.Barcode == key || x.SKU.Contains(key));
        }

        public List<ItemOption> GetByItemCategoryID(Guid id)
        {
            return _posRepository.GetByItemCategory(id);
        }
        public List<ItemOption> GetItem_SaleInvoice(Guid id)
        {
            return _posRepository.GetItem_SaleInvoice(id);
        }
        public List<CartViewModel> GetItem_SaleInvoice1(Guid id)
        {
            return _posRepository.GetItem_SaleInvoice1(id);
        }
        public IEnumerable<ItemOption> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _posRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public ItemOption GetByID(Guid id)
        {
            return _posRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(ItemOption itemOption)
        {
            _posRepository.Update(itemOption);
        }

        public string getCode()
        {
            return _posRepository.GetCode();
        }

        public IEnumerable<ItemOption> GetByItemID(Guid id)
        {
            return _posRepository.GetByItemID(id);
        }

    
    }
}
