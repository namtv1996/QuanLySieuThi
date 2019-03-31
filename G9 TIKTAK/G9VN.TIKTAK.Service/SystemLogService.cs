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
    public interface ISystemLogService
    {
        void Add(SYSAuditingLog log);

        

        IEnumerable<SYSAuditingLog> GetAll();

     

        void SaveChanges();
    }
    public class SystemLogService: ISystemLogService
    {
        private ISystemLogRepository _systemLogRepository;
        private IUnitOfWork _unitOfWork;

        public SystemLogService(ISystemLogRepository systemLogRepository, IUnitOfWork unitOfWork)
        {
            this._systemLogRepository = systemLogRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(SYSAuditingLog log)
        {
            _systemLogRepository.Add(log);
        }

        public IEnumerable<SYSAuditingLog> GetAll()
        {
            return _systemLogRepository.GetAll();
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

    }
}
