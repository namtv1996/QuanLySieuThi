using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class PricePolicyViewModel
    {
        public Guid PricePolicyID { get; set; }
     
        public string PricePolicyCode { get; set; }

        public string PricePolicyName { get; set; }

        public bool Status { get; set; }

        public string ApplyFor { get; set; }

        public string Description { get; set; }

        public DateTime? CreateDate { get; set; }

        
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

       
        public string ModifyBy { get; set; }
    }
}