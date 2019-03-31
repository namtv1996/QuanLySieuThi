using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ComboViewModel
    {
        public Guid ID { get; set; }
        public Guid ComboID { get; set; }
        public Guid ItemID { get; set; }
        public decimal? QuantityItem { get; set; }
        public int? TransferPrice { get; set; }
        public decimal TotalAmount { get; set; }

    }
}