using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Data.Infrastructure;

namespace G9VN.TIKTAK.Service
{
    public interface IAttributeService
    {
        IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> search(string key);
        IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> getAll();
        void add(G9VN.TIKTAK.Model.Models.Attribute attr);
        G9VN.TIKTAK.Model.Models.Attribute getByName(string key);
        void SaveChanges();
    }
    public class AttributeService : IAttributeService
    {
        private IAttributeRepository _attributeRepository;
        private IUnitOfWork _unitOfWork;
        //tiêm sự  phụ thuộc qua hàm khởi tạo
        public AttributeService(IAttributeRepository _attributeRepository, IUnitOfWork _unitOfWork)
        {
            this._attributeRepository = _attributeRepository;
            this._unitOfWork = _unitOfWork;
        }

        public void add(Model.Models.Attribute attr)
        {
            _attributeRepository.add(attr);
        }

        public IEnumerable<Model.Models.Attribute> getAll()
        {
            return _attributeRepository.getAll();
        }

        public Model.Models.Attribute getByName(string key)
        {
            return _attributeRepository.getByName(key);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public IEnumerable<Model.Models.Attribute> search(string key)
        {
            return _attributeRepository.search(key);
        }
    }
}
