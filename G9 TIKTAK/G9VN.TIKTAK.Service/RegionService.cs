using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IRegionService
    {
        IEnumerable<Region> GetAll();
        IEnumerable<Region> GetOne(int grade);
        IEnumerable<Region> GetAddress(Guid key);
    }
    public class RegionService : IRegionService
    {
        private IRegionRepository _regionRepository;
        private IUnitOfWork _unitOfWork;
        public RegionService(IRegionRepository regionRepository, IUnitOfWork unitOfWork)
        {
            this._regionRepository = regionRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Region> GetAddress(Guid key)
        {
            return _regionRepository.GetAddress(key);
        }

        public IEnumerable<Region> GetAll()
        {
            return _regionRepository.GetAll();
        }

        public IEnumerable<Region> GetOne(int grade)
        {
            return _regionRepository.GetOne(grade);
        }
    }
}
