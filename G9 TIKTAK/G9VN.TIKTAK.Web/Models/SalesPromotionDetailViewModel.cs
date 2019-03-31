using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class SalesPromotionDetailViewModel
    {
       
        public Guid VoucherDetailID { get; set; }
        public Guid VoucherID { get; set; }
        public Guid? ItemID { get; set; }
        public bool VoucherType { get; set; }
        public int? QuantityItem { get; set; }
        public int? LimitPromotion { get; set; }
        public decimal? ConditionsMax { get; set; }
        public decimal? ConditionsMin { get; set; }
        public decimal? PromotionValue { get; set; }
        public int? PromotionType { get; set; }
    }
}