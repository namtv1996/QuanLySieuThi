using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class CashBookViewModel
    {
        public Guid VoucherID { get; set; }
        public DateTime? VoucherDate { get; set; }
        public string VoucherNo { get; set; }
        public string OriginalVoucherNo { get; set; }
        public string ObjectName { get; set; }
        public int? Status { get; set; }
        public int? VoucherType { get; set; }
        public decimal? TotalAmount { get; set; }

    }
}
