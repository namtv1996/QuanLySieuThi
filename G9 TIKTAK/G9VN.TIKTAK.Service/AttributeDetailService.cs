using G9VN.TIKTAK.Common;
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
    public interface IAttributeDetailService
    {
        void Add(AttributeDetail attr);
        void Delete(AttributeDetail attr);
        void deleteAttributeDetail(Guid id);
        void UpdateAttributeDetail(AttributeDetail attr);
        IEnumerable<AttributeDetail> getByItemOptionID(Guid id);
        IEnumerable<AttributeViewModel> getListAttribute(Guid id);
        void SaveChanges();
    }
    public class AttributeDetailService:IAttributeDetailService
    {
        private IAttributeDetailRepository _attributeDetailRepository;
        private IUnitOfWork _unitOfWork;
        public AttributeDetailService(IAttributeDetailRepository _attributeDetailRepository, IUnitOfWork _unitOfWork)
        {
            this._attributeDetailRepository = _attributeDetailRepository;
            this._unitOfWork = _unitOfWork;
        }

        public void Add(AttributeDetail attr)
        {
            _attributeDetailRepository.Add(attr);
        }

        public void Delete(AttributeDetail attr)
        {
            _attributeDetailRepository.Delete(attr);
        }

        public void deleteAttributeDetail(Guid id)
        {
            _attributeDetailRepository.deleteAttributeDetail(id);
        }

        public IEnumerable<AttributeDetail> getByItemOptionID(Guid id)
        {
            return _attributeDetailRepository.getByItemOptionID(id);
        }

        public IEnumerable<AttributeViewModel> getListAttribute(Guid id)
        {
            return _attributeDetailRepository.getListAttribute(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void UpdateAttributeDetail(AttributeDetail attr)
        {
            _attributeDetailRepository.Update(attr);
        }
    }
}
