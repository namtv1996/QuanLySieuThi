using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;

namespace G9VN.TIKTAK.Service
{
    public interface IBranchService
    {
        void Add(Branch branch);

        void Update(Branch branch);

        void Delete(Guid id);

        IEnumerable<Branch> GetAll();

        IEnumerable<Branch> GetAllPaging(int page, int pagesize, out int totalRow);

        Branch GetByID(Guid id);

        void SaveChanges();
    }

    public class BranchService : IBranchService
    {
        private IBranchRepository _branchRepository;
        private IUnitOfWork _unitOfWork;

        //tiem su phu thuoc tu G9VN.TIKTAK.Data thong qua interface IBranchRepository
        //tiem su phu thuoc tu G9VN.TIKTAK.UnitTest thong qua interface IUnitOfWork
        // thong qua DI Autofac _branchRepository se duoc khoi tao la doi tuong cua BranchRepository (_branchRepository = new BranchRepository)
        public BranchService(IBranchRepository branchRepository, IUnitOfWork unitOfWork)
        {
            this._branchRepository = branchRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(Branch branch)
        {
            _branchRepository.Add(branch);
        }

        public void Delete(Guid id)
        {
            _branchRepository.Delete(id);
        }

        public IEnumerable<Branch> GetAll()
        {
            return _branchRepository.GetAll();
        }

        public IEnumerable<Branch> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _branchRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public Branch GetByID(Guid id)
        {
            return _branchRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(Branch branch)
        {
            _branchRepository.Update(branch);
        }
    }
}