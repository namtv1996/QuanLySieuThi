using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class VoucherCheckDetailViewModel
    {
        public Guid VoucherCheckDetailID { get; set; }

        public Guid? VoucherID { get; set; }

        public Guid? ItemID { get; set; }

        public int? InStock { get; set; }

        public int? AfterCheck { get; set; }

       
        public string Reason { get; set; }

       
        public int Result { get; set; }
    }
}