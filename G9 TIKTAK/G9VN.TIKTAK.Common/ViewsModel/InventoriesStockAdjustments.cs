using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class InventoriesStockAdjustments
    {
        public Guid? ItemOptionID { get; set; }

        public string SKU { get; set; }

        public string Name { get; set; }

        public decimal? PurchasePrice { get; set; }

        public Guid? VoucherID { get; set; }

        public string VoucherCode { get; set; }

        public DateTime? VoucherDate { get; set; }

        public Guid? BranchID { get; set; }

        public string Reason { get; set; }

        public decimal? InStock { get; set; }

        public decimal? AfterCheck { get; set; }

        public decimal? Result { get; set; }

        public decimal? Amount { get; set; }
    }
}
