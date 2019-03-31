using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SaleByEmployeeViewModel
    {
        public string CreatedBy { get; set; }
        public decimal? totalAmount { get; set; }
        public decimal? totalVatAmount { get; set; }
        public decimal? discountAmount { get; set; }
        public decimal? shippingAmount { get; set; }
        public decimal? revenue { get; set; }
        public decimal? quantitySales { get; set; }
        public decimal? quantityReturn { get; set; }
        public decimal? totalAmountReturn { get; set; }
        public decimal? actualRevenue { get; set; }
        public decimal? totalPayingCustomer { get; set; }
    }
}
