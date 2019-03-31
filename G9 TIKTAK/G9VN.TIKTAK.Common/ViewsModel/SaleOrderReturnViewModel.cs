using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SaleOrderReturnViewModel
    {
        public Guid VoucherID { get; set; }

        public string VoucherNo { get; set; }

        public DateTime? VoucherDate { get; set; }

        public Guid? ObjectID { get; set; }

        public string ObjectCode { get; set; }

        public string ObjectName { get; set; }

        public decimal? TotalAmount { get; set; }

        public Guid? BranchID { get; set; }

        public int? QuantityReturn { get; set; }
    }
}
