using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class OrderStatisticsViewModel
    {
        public Guid VoucherID { get; set; }

        public string VoucherNo { get; set; }

        public Guid? ObjectID { get; set; }

        public string ObjectName { get; set; }

        public string ObjectCode { get; set; }

        public decimal? Quantity { get; set; }

        public decimal? TotalAmount { get; set; }

        public decimal? TotalVATAmount { get; set; }

        public decimal? DiscountAmount { get; set; }

        public decimal? ShippingAmount { get; set; }

        public decimal? Revenue { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? VoucherDate { get; set; }

        public int? StatusID { get; set; }
    }
}
