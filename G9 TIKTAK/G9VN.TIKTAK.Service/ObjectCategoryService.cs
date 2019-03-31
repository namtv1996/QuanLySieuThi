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
    public interface IObjectCategoryService
    {
        void Add(ObjectCategory objectCategory);

        void Update(ObjectCategory objectCategory);

        void Delete(Guid id);

        IEnumerable<ObjectCategory> GetByObjectKind(int id);

        IEnumerable<ObjectCategory> GetAllPaging(int page, int pagesize, out int totalRow);
      

        ObjectCategory GetByID(Guid id);

        void SaveChanges();
    }
    public class ObjectCategoryService: IObjectCategoryService
    {
        private IObjectCategoryRepository _objectCategoryRepository;
        private IUnitOfWork _unitOfWork;

        public ObjectCategoryService(IObjectCategoryRepository objectCategoryRepository, IUnitOfWork unitOfWork)
        {
            this._objectCategoryRepository = objectCategoryRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ObjectCategory objectCategory)
        {
            _objectCategoryRepository.Add(objectCategory);
        }

        public void Delete(Guid id)
        {
            _objectCategoryRepository.Delete(id);
        }

        public IEnumerable<ObjectCategory> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _objectCategoryRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public ObjectCategory GetByID(Guid id)
        {
            return _objectCategoryRepository.GetSingleById(id);
        }

        public IEnumerable<ObjectCategory> GetByObjectKind(int id)
        {
            return _objectCategoryRepository.GetByObjectKind(id);
        }

       
        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(ObjectCategory objectCategory)
        {
            _objectCategoryRepository.Update(objectCategory);
        }
    }
}
