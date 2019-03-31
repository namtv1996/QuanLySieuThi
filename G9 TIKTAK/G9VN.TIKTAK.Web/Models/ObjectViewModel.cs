using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ObjectViewModel
    {
        public Guid ObjectID { get; set; }


        public string ObjectCode { get; set; }


        public string ObjectName { get; set; }

        public Guid? ObjectCategoryID { get; set; }
        public string ObjectAddress { get; set; }
        public string ObjectState { get; set; }
        public string ObjectDistrict { get; set; }
        public string ObjectWard { get; set; }

        public string Tel { get; set; }


        public string BankAccount { get; set; }


        public string BankName { get; set; }


        public string TaxCode { get; set; }


        public string Email { get; set; }
        public Guid? CaringStaff { get; set; }


        public decimal? DiscountRate { get; set; }

        public DateTime? BirthdayDate { get; set; }

        public int? AccumulativePoint { get; set; }


        public decimal? Debt { get; set; }

        public int ObjectKind { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public DateTime? CreateDate { get; set; }

       
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        
        public string ModifyBy { get; set; }
        public string Sex { get; set; }
        public Guid? BranchID { get; set; }

        public int? ApplyIncentives { get; set; }

        public Guid? PricePolicyDefault { get; set; }

        public decimal? TaxRateDefault { get; set; }

        public decimal? DiscountRateDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }
    }
}