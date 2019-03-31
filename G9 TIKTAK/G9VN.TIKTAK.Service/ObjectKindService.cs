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
    public interface IObjectKindService
    {
        void Add(ObjectKind objectKind);

        void Update(ObjectKind objectKind);

        void Delete(int id);

        IEnumerable<ObjectKind> GetAll();

        IEnumerable<ObjectKind> GetAllPaging(int page, int pagesize, out int totalRow);

        ObjectKind GetByID(int id);

        void SaveChanges();
    }
    public class ObjectKindService: IObjectKindService
    {
        private IObjectKindRepository _objectKindRepository;
        private IUnitOfWork _unitOfWork;

        public ObjectKindService(IObjectKindRepository objectKindRepository, IUnitOfWork unitOfWork)
        {
            this._objectKindRepository = objectKindRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ObjectKind objectKind)
        {
            _objectKindRepository.Add(objectKind);
        }

        public void Delete(int id)
        {
            _objectKindRepository.Delete(id);
        }

        public IEnumerable<ObjectKind> GetAll()
        {
            return _objectKindRepository.GetAll();
        }

        public IEnumerable<ObjectKind> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _objectKindRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public ObjectKind GetByID(int id)
        {
            return _objectKindRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(ObjectKind objectKind)
        {
            _objectKindRepository.Update(objectKind);
        }
    }
}
