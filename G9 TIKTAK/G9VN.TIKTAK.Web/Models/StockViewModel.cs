using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class StockViewModel
    {  
        public Guid StockID { get; set; }

        public Guid ItemOptionID { get; set; }

        public Guid BranchID { get; set; }

        public decimal Quantity { get; set; }

        public decimal InitialInventory { get; set; }
    }
}