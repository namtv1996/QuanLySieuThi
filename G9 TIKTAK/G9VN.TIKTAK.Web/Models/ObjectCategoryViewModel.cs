using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ObjectCategoryViewModel
    {
        public Guid Id { get; set; }

        
        public string Name { get; set; }

        public string Description { get; set; }

        public int NumberObject { get; set; }

        public bool Status { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        public string ModifyBy { get; set; }

        public int? ObjectKind { get; set; }


        public Guid? PricePolicyDefault { get; set; }

        public decimal? TaxRateDefault { get; set; }

        public decimal? DiscountRateDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }

    }
}