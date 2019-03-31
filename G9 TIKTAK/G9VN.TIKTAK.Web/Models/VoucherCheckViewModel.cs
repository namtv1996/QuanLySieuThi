using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class VoucherCheckViewModel
    {
        public Guid VoucherID { get; set; }

        public string VoucherCode { get; set; }

        public int? VoucherType { get; set; }

        public Guid? ObjectID { get; set; }

        public Guid? BranchID { get; set; }

       

        public DateTime? VoucherDate { get; set; }

        public string Tags { get; set; }

        
        public string Note { get; set; }

        public int? TotalAfterCheck { get; set; }

        public int? TotalDifference { get; set; }


        public DateTime? CreateDate { get; set; }

       
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        
        public string ModifyBy { get; set; }

        public bool Status { get; set; }

       
        public string Description { get; set; }

        public DateTime? EndUpdate { get; set; }

    }
}