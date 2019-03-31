using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class BranchViewModel
    {
        public Guid BranchID { get; set; }

   
        public string BranchCode { get; set; }

        public string BranchName { get; set; }

  
        public string Address { get; set; }


        public string TelephoneNumber { get; set; }

      
        public string Email { get; set; }

    
        public bool Status { get; set; }

    }
}