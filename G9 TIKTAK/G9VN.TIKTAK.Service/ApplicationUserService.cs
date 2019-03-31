using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.SYSTEM.Models;
using System;
using G9VN.TIKTAK.Exceptions;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IApplicationUserService
    {
        List<ApplicationUser> GetAll(string userName);
        Guid GetStoreID(string userName);
        string GetStoreName(string userName);
        ManageStore getStoreByUserName(string userName);
        ApplicationUser GetByName(string key);
        void Update(ApplicationUser appUser);
        void Save();
    }


    internal class ApplicationUserService : IApplicationUserService
    {
        private IApplicationUserRepository _appUserRepository;
        private IUnitOfWork _unitOfWork;
        public ApplicationUserService(IUnitOfWork unitOfWork,
            IApplicationUserRepository appUserRepository)
        {
            this._appUserRepository = appUserRepository;
            this._unitOfWork = unitOfWork;
        }
        public List<ApplicationUser> GetAll(string userName)
        {
            return _appUserRepository.GetAll(userName);
        }

        public ApplicationUser GetByName(string key)
        {
            return _appUserRepository.GetUserName(key);
        }

        public ManageStore getStoreByUserName(string userName)
        {
            return _appUserRepository.getStoreByUserName(userName);
        }

        public Guid GetStoreID(string userName)
        {
            return _appUserRepository.GetStoreID(userName);
        }

        public string GetStoreName(string userName)
        {
            return _appUserRepository.GetStoreName(userName);
        }

        public void Save()
        {
            _unitOfWork.CommitSYS();
        }

        public void Update(ApplicationUser appUser)
        {
            _appUserRepository.Update(appUser);
        }
    }
}