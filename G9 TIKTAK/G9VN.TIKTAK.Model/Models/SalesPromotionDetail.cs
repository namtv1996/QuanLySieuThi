
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("salesPromotionDetail")]
    public class SalesPromotionDetail
    {
        [Key]
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
