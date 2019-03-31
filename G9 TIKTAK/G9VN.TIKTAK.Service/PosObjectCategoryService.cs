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
    public interface IPosObjectCategoryService
    {
        IEnumerable<ObjectCategory> GetByObjectKind(int id);

      

    }
    public class PosObjectCategoryService : IPosObjectCategoryService
    {
        private IObjectCategoryRepository _posObjectCategoryRepository;
        private IUnitOfWork _unitOfWork;

        public PosObjectCategoryService(IObjectCategoryRepository objectCategoryRepository, IUnitOfWork unitOfWork)
        {
            this._posObjectCategoryRepository = objectCategoryRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<ObjectCategory> GetByObjectKind(int id)
        {
            return _posObjectCategoryRepository.GetByObjectKind(id);
        }
    }
}
