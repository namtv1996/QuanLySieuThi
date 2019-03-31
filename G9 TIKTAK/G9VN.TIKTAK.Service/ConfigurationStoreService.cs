using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Service
{
    public interface IConfigurationStoreService
    {
        void Add(ConfigurationStore config);

        void Update(ConfigurationStore config);

        void Delete(Guid id);

        void SaveChanges();

        ConfigurationStore getConfigByStore(Guid? manageStoreID);

        ConfigurationStore GetByID(Guid Id);

    }
    public class ConfigurationStoreService : IConfigurationStoreService
    {
        private IConfigurationStoreRepository _configurationStoreRepository;
        private IUnitOfWork _unitOfWork;
        public ConfigurationStoreService(IUnitOfWork unitOfWork, IConfigurationStoreRepository configurationStoreRepository)
        {
            this._configurationStoreRepository = configurationStoreRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(ConfigurationStore config)
        {
            _configurationStoreRepository.Add(config);
        }

        public void Delete(Guid id)
        {
            _configurationStoreRepository.Delete(id);
        }

        public ConfigurationStore GetByID(Guid Id)
        {
            return _configurationStoreRepository.GetSingleById(Id);
        }

        public ConfigurationStore getConfigByStore(Guid? manageStoreID)
        {
            return _configurationStoreRepository.getConfigByStore(manageStoreID);
        }

        public void SaveChanges()
        {
            _unitOfWork.CommitSYS();
        }

        public void Update(ConfigurationStore config)
        {
            _configurationStoreRepository.Update(config);
        }
    }
}
