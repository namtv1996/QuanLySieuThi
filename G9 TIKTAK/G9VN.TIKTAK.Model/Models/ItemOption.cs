namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ItemOption")]
    public partial class ItemOption
    {
        public ItemOption()
        {
            AttributeDetail = new HashSet<AttributeDetail>();

        }
        [Key]
        public Guid ID { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(15)]
        public string Barcode { get; set; }

        [StringLength(15)]
        public string SKU { get; set; }

        public Guid? StockID { get; set; }

        [StringLength(150)]
        public string Color { get; set; }

        [StringLength(150)]
        public string Size { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(150)]
        public string CreateBy { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(10)]
        public string Weigh { get; set; }

        public Guid? BranchID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        [StringLength(150)]
        public string ModifiedBy { get; set; }

        public decimal? TaxRate { get; set; }

        [StringLength(150)]
        public string Material { get; set; }

        [Column(TypeName = "money")]
        public decimal? SalePrice { get; set; }

        [Column(TypeName = "money")]
        public decimal? PurchasePrice { get; set; }

        [Column(TypeName = "money")]
        public decimal InitialPrice { get; set; }

        [Column(TypeName = "money")]
        public decimal? WholesalePrice { get; set; }

        [StringLength(150)]
        public string UnitName { get; set; }

        [StringLength(50)]
        public string UnitConvertRate { get; set; }

        public int ClosingQuantity { get; set; }

        public Guid ItemID { get; set; }

        [StringLength(250)]
        public string Image1 { get; set; }

        [StringLength(250)]
        public string Image2 { get; set; }

        [StringLength(250)]
        public string Image3 { get; set; }

        [StringLength(250)]
        public string Image4 { get; set; }

        public bool Status { get; set; }

        public bool HomeFlag { get; set; }
        //tồn tối thiểu
        public decimal? MinimumInventory { get; set; }
        //tồn tối đa
        public decimal? MaximumInventory { get; set; }
        //cảnh báo khi vượt định mức
        public bool? NotificationInventory { get; set; }
        public virtual Item Item { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AttributeDetail> AttributeDetail { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Stock> stock { get; set; }
    }
}
