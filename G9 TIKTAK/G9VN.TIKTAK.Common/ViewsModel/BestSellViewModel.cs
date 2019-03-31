using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class BestSellViewModel
    {
        public Guid ID { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Amount { get; set; }
        public int? VoucherQuantity { get; set; }
    }
}
