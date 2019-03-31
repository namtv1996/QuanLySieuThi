using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ManageStoreViewModel
    {
        public Guid ManageStoreID { get; set; }

        public string Address { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? Expirydate { get; set; }

        public string StoreName { get; set; }
        public string Business { get; set; }
        public string Logo { get; set; }
        public string Server { get; set; }
    }
}