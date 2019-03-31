using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IPaymentScheduleRepository:IRepository<PaymentSchedule>
    {

    }
    public class PaymentScheduleRepository:RepositoryBase<PaymentSchedule>, IPaymentScheduleRepository
    {
        public PaymentScheduleRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
