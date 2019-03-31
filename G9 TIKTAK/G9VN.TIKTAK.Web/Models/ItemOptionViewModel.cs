using System;

namespace G9VN.TIKTAK.Web.Models
{
    public class ItemOptionViewModel
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public string SKU { get; set; }
        public string Barcode { get; set; }

        public Guid? StockID { get; set; }

        public string Color { get; set; }

        public string Size { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateBy { get; set; }
        public string UnitName { get; set; }

        public string UnitConvertRate { get; set; }

      
        public string Description { get; set; }

        public string Weigh { get; set; }

        public Guid? BranchID { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public string ModifiedBy { get; set; }

        public decimal? TaxRate { get; set; }

        public string Material { get; set; }

        public decimal? SalePrice { get; set; }

        public decimal? PurchasePrice { get; set; }

        public decimal InitialPrice { get; set; }

        public decimal? WholesalePrice { get; set; }

        public int ClosingQuantity { get; set; }

        public Guid ItemID { get; set; }

        public string Image1 { get; set; }

        public string Image2 { get; set; }

        public string Image3 { get; set; }

        public string Image4 { get; set; }

        public bool Status { get; set; }

        public bool HomeFlag { get; set; }
        //tồn tối thiểu
        public decimal? MinimumInventory { get; set; }
        //tồn tối đa
        public decimal? MaximumInventory { get; set; }
        //cảnh báo khi vượt định mức
        public bool? NotificationInventory { get; set; }
    }
}