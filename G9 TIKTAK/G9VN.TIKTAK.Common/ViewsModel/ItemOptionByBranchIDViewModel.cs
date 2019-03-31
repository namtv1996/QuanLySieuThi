using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
   public class ItemOptionByBranchIDViewModel
    {
        public Guid ID { get; set; }
        public Guid? ItemID { get; set; }
        public decimal SalePrice { get; set; }
        public string Barcode { get; set; }
        public string SKU { get; set; }
        public string image1 { get; set; }
        public string Name { get; set; }
        public string UnitName { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool Status { get; set; }
        public Decimal quantity { get; set; }
    }
}
