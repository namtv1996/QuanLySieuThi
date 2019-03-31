using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class InventoriesHighRateViewModel
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public string Barcode { get; set; }

        public string SKU { get; set; }

        public bool? Status { get; set; }
       
        public decimal? MaximumInventory { get; set; }

        public decimal? Quantity { get; set; }

        public decimal? NeedToExport { get; set; }

        public Guid? BranchID { get; set; }
    }
}
