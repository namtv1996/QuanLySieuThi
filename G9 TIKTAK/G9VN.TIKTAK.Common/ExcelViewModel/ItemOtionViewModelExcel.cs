using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ExcelViewModel
{
    public class ItemOtionViewModelExcel
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string SKU { get; set; }
        public int ClosingQuantity { get; set; }
        public decimal? SalePrice { get; set; }
        public decimal? WholesalePrice { get; set; }
    }
}
