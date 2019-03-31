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
    public interface IPaymentScheduleService
    {
        void Add(PaymentSchedule paymentSchedule);

        void Update(PaymentSchedule paymentSchedule);

        void Delete(Guid id);

        IEnumerable<PaymentSchedule> GetAll();

        IEnumerable<PaymentSchedule> GetAllPaging(int page, int pagesize, out int totalRow);

        PaymentSchedule GetByID(Guid id);

        void SaveChanges();

    }
    public class PaymentScheduleService:IPaymentScheduleService
    {
        private IPaymentScheduleRepository _paymentScheduleRepository;
        private IUnitOfWork _unitOfWork;

        public PaymentScheduleService(IPaymentScheduleRepository paymentScheduleRepository, IUnitOfWork unitOfWork)
        {
            this._paymentScheduleRepository = paymentScheduleRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(PaymentSchedule paymentSchedule)
        {
            _paymentScheduleRepository.Add(paymentSchedule);
        }

        public void Delete(Guid id)
        {
            _paymentScheduleRepository.Delete(id);
        }

        public IEnumerable<PaymentSchedule> GetAll()
        {
            return _paymentScheduleRepository.GetAll();
        }

        public IEnumerable<PaymentSchedule> GetAllPaging(int page, int pagesize, out int totalRow)
        {
            return _paymentScheduleRepository.GetMultiPaging(x => x.Status, out totalRow, page, pagesize);
        }

        public PaymentSchedule GetByID(Guid id)
        {
            return _paymentScheduleRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(PaymentSchedule paymentSchedule)
        {
            _paymentScheduleRepository.Update(paymentSchedule);
        }
    }
}
