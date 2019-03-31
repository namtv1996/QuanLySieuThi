using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class TransactionStockViewModel
    {
        public Guid VoucherID { get; set; }
        public DateTime? VoucherDate { get; set; }
        public int? VoucherType { get; set; }
        public string VoucherNo { get; set; }
        public Guid? BranchID { get; set; }
        public string Name { get; set; }
        public string SKU { get; set; }
        public Guid? ID { get; set; }
        public decimal? InStock { get; set; }
        public decimal? AfterCheck { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Amount { get; set; }      
    }
}
