using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ItemViewModel
    {
        public Guid ItemID { get; set; }

        public string Name { get; set; }

        public string Tags { get; set; }
        public int? Quantity { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
        public string Unit { get; set; }

        public DateTime CreateDate { get; set; }
        public string Image { get; set; }
        public string CreateBy { get; set; }

        public string Brand { get; set; }
        public bool Status { get; set; }
        public Guid? ItemCategoryID { get; set; }
    }
}