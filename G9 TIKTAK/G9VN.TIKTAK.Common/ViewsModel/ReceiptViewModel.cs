using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class ReceiptViewModel
    {
        public Guid VoucherID { get; set; }
        public string VoucherNo { get; set; }
        public string OriginalVoucherNo { get; set; }
        public Guid? OriginalVoucherID { get; set; }
        public DateTime? VoucherDate { get; set; }
        public int? VoucherType { get; set; }
        public Guid? ObjectID { get; set; }
        public string ObjectName { get; set; }
        public string Employee { get; set; }
        public decimal TotalAmountOC { get; set; }      
    }
}
