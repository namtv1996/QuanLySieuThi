using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class AutoCopleteProduct
    {
        public Guid ID { get; set; }
        public string Barcode { get; set; }
        public string SKU { get; set; }
        public string image1 { get; set; }
        public string Name { get; set; }
        public Decimal saleprice { get; set; }
        public Decimal WholesalePrice { get; set; }
        public Decimal PurchasePrice { get; set; }
        public Decimal quantity { get; set; }
        public int ClosingQuantity { get; set; }
        public Guid ItemID { get; set; }
    }
}
