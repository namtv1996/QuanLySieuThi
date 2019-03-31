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
    public interface IComboService
    {
        void Add(ComboDetail combo);
        void Delete(Guid id);
        void Update(ComboDetail combo);
        void SaveChanges();
        IEnumerable<ComboDetail> GetAll();
        IEnumerable<ComboDetail> GetByID(Guid id);
    }
    public class ComboService : IComboService
    {
        private IComboRepository _comboRepository;
        private IUnitOfWork _unitOfWork;
        public ComboService(IUnitOfWork unitOfWork, IComboRepository appstockRepository)
        {
            this._comboRepository = appstockRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ComboDetail combo)
        {
            _comboRepository.Add(combo);
        }

        public void Delete(Guid id)
        {
            _comboRepository.Delete(id);
        }

        public void Update(ComboDetail combo)
        {
            _comboRepository.Update(combo);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }


        public IEnumerable<ComboDetail> GetAll()
        {
            return _comboRepository.GetAll();
        }


        public IEnumerable<ComboDetail> GetByID(Guid id)
        {
            return _comboRepository.GetByID(id);
        }
    }
}
