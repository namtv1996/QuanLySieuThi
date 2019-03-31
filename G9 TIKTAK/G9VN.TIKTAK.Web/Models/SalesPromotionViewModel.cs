using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class SalesPromotionViewModel
    {
        public Guid VoucherID { get; set; }
        public String PromotionName { get; set; }
        public int VoucherType { get; set; }
        public string VoucherNo { get; set; }
        public DateTime VoucherDate { get; set; }
        public int ApplyQuantity { get; set; }
        public string Description { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? Expirydate { get; set; }
        public Guid? Object { get; set; }
        public bool Status { get; set; }
        public Guid? BranchID { get; set; }
    }
}