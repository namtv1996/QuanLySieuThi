using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class CartViewModel
    {
        public Guid ID { get; set; }
        public int? SortOrder { get; set; }
        public string Image1 { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPriceOC { get; set; }
        public decimal DiscountAmountOC { get; set; }
        public decimal VATRate { get; set; }
        public decimal AmountOC { get; set; }
       

    }
}
