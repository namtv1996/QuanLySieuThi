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
    public interface IObjectService
    {
        IEnumerable<Object1> GetByObjectKind(int id);
        IEnumerable<Object1> GetByObjectKind(int id,string key);
        
        IEnumerable<Object1> GetByStatus(bool status);
        IEnumerable<Object1> GetObjectByObjectCategory(int objKind, Guid id);
        void Add(Object1 obj);

        void Update(Object1 obj);

        void Delete(Guid id);

        IEnumerable<Object1> GetAll();

        IEnumerable<Object1> GetAllPaging(int page, int pagesize, out int totalRow);

        Object1 GetByID(Guid id);

        string getCode(string parentID);

        void SaveChanges();

        CountVoucherAndTotalAmount CountVoucherAndTotalAmountOfObject(Guid id);
    }
    public class ObjectService: IObjectService
    {
        private IObjectRepository _objectRepository;
        private IUnitOfWork _unitOfWork;

        public ObjectService(IObjectRepository objectRepository, IUnitOfWork unitOfWork)
        {
            this._objectRepository = objectRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(Object1 obj)
        {
            _objectRepository.Add(obj);
        }

        public void Delete(Guid id)
        {
            _objectRepository.Delete(id);
        }

        public IEnumerable<Object1> GetByObjectKind(int id)
        {
            return _objectRepository.GetByObjectKind(id);
        }

        public IEnumerable<Object1> GetByStatus(bool status)
        {
            return _objectRepository.GetByStatus(status);
        }

        public IEnumerable<Object1> GetAll()
        {
            return _objectRepository.GetAll();
        }

        public IEnumerable<Object1> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _objectRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public Object1 GetByID(Guid id)
        {
            return _objectRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(Object1 obj)
        {
            _objectRepository.Update(obj);
        }

        public IEnumerable<Object1> GetByObjectKind(int id, string key)
        {
            return _objectRepository.GetByObjectKind(id,key);
        }

        

        public string getCode(string parentID)
        {
            return _objectRepository.GetCode(parentID);
        }

        public IEnumerable<Object1> GetObjectByObjectCategory(int objKind, Guid id)
        {
            return _objectRepository.GetObjectByObjectCategory(objKind,id);
        }

        public CountVoucherAndTotalAmount CountVoucherAndTotalAmountOfObject(Guid id)
        {
            return _objectRepository.CountVoucherAndTotalAmountOfObject(id);
        }
    }
}
