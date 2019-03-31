using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.SYSTEM.Models;
using System;
using G9VN.TIKTAK.Exceptions;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IManageStoreService
    {
        IEnumerable<ManageStore> GetAll();
        IEnumerable<ManageStore> getStoreName(string key);
        string GetStoreName(string userName);
        ManageStore GetStore(string key);
        ManageStore Add(ManageStore model);
        void Update(ManageStore appStore);
        void Save();

        List<Notifications> getNotification(Guid id);
        void UpdateNotifi(Notifications notifi);
        Notifications getNotifiById(Guid id);
    }

    public class ManageStoreService : IManageStoreService
    {
        private IManageStoreRepository _ManageStoreRepository;
        private INotificationsRepository _notifiRepository;
        private IUnitOfWork _unitOfWork;
        public ManageStoreService(IUnitOfWork unitOfWork, IManageStoreRepository appStoreRepository, INotificationsRepository notifiRepository)
        {
            this._ManageStoreRepository = appStoreRepository;
            this._notifiRepository = notifiRepository;
            this._unitOfWork = unitOfWork;
        }

        public ManageStore Add(ManageStore model)
        {
            return _ManageStoreRepository.Add(model);
        }

        public IEnumerable<ManageStore> GetAll()
        {
            return _ManageStoreRepository.GetAll();
        }

        
        public ManageStore GetStore(string key)
        {
            return _ManageStoreRepository.GetStore(key);
        }

        public IEnumerable<ManageStore> getStoreName(string key)
        {
            return _ManageStoreRepository.getStoreName(key);
        }

        public string GetStoreName(string userName)
        {
            return _ManageStoreRepository.GetStoreName(userName);
        }

        public void Save()
        {
            _unitOfWork.CommitSYS();
        }


        public void Update(ManageStore appStore)
        {
            if (_ManageStoreRepository.CheckContains(x => x.StoreName == appStore.StoreName && x.ManageStoreID != appStore.ManageStoreID))
                throw new NameDuplicatedException("Tên không được trùng");
            _ManageStoreRepository.Update(appStore);
        }

        public void UpdateNotifi(Notifications notifi)
        {
            _notifiRepository.Update(notifi);
        }

        public Notifications getNotifiById(Guid id)
        {
            return _notifiRepository.GetSingleById(id);
        }

        public List<Notifications> getNotification(Guid id)
        {
            return _notifiRepository.getNotification(id);
        }

    }
}
