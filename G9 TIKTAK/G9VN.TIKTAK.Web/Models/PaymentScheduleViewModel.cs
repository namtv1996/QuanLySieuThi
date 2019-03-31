using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class PaymentScheduleViewModel
    {
        public Guid PaymentScheduleID { get; set; }

        
        public string PaymentScheduleName { get; set; }

        public int PayWithin { get; set; }

        public bool IsDefault { get; set; }

        public bool Status { get; set; }

       
        public string Description { get; set; }

        public DateTime? CreateDate { get; set; }

       
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

       
        public string ModifyBy { get; set; }
    }
}