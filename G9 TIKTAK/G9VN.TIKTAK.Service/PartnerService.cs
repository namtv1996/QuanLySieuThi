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
    public interface IPartnerService
    {
        void Add(Partner obj);

        void Update(Partner obj);

        void Delete(Guid id);

        IEnumerable<Partner> GetAll();
        void SaveChanges();
        Partner GetByID(Guid id);
    }
    public class PartnerService : IPartnerService
    {
        private IPartnerRepository _partnerRepository;
        private IUnitOfWork _unitOfWork;

        public PartnerService(IPartnerRepository partnerRepository, IUnitOfWork unitOfWork)
        {
            this._partnerRepository = partnerRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(Partner obj)
        {
            _partnerRepository.Add(obj);
        }

        public void Delete(Guid id)
        {
            _partnerRepository.Delete(id);
        }

        public IEnumerable<Partner> GetAll()
        {
            return _partnerRepository.GetAll();
        }

        public void Update(Partner obj)
        {
            _partnerRepository.Update(obj);
        }
        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public Partner GetByID(Guid id)
        {
            return _partnerRepository.GetSingleById(id);
        }
    }
}
