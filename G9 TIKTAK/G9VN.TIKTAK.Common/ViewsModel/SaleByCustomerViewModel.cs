using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SaleByCustomerViewModel
    {
        public Guid ObjectID { get; set; }
        public string ObjectCode { get; set; }
        public string ObjectName { get; set; }
        public decimal totalAmount { get; set; }
        public decimal discountAmount { get; set; }       
        public decimal totalVATAmount { get; set; }
        public decimal totalPayingCustomer { get; set; }


    }
}
