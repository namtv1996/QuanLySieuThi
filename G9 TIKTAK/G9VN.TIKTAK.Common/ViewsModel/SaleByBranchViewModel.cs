using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SaleByBranchViewModel
    {
        public Guid BranchID { get; set; }

        public string BranchName { get; set; }

        public int? QuantitySaleOrder { get; set; }

        public decimal? TotalAmount { get; set; }

        public decimal? TotalVATAmount { get; set; }

        public decimal? DiscountAmount { get; set; }

        public decimal? ShippingAmount { get; set; }

        public decimal? TotalPayingCustomer { get; set; }

        public decimal? Revenue { get; set; }

        public decimal? Medium { get; set; }
    }
}
