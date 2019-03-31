using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class PartnerViewModel
    {
        public Guid ID { get; set; }
        public bool? Status { get; set; }
        public string StoreName { get; set; }
        public string PartnerName { get; set; }
        public string NameSignIn { get; set; }
        public string PassSignIn { get; set; }
        public Guid? BankID { get; set; }
    }
}