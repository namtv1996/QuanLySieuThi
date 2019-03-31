using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class UpdateInventoryParam
    {
        public Guid BranchID { get; set; }
        public Guid voucherID { get; set; }
    }
}