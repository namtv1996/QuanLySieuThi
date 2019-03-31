namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("StockTransfer")]
    public partial class StockTransfer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public StockTransfer()
        {
            StockTransferDetail = new HashSet<StockTransferDetail>();
        }

        [Key]
        public Guid VoucherID { get; set; }

        public int VoucherType { get; set; }

        public DateTime VoucherDate { get; set; }

        [Required]
        [StringLength(20)]
        public string VoucherNo { get; set; }

        public Guid? ObjectID { get; set; }

        [StringLength(255)]
        public string ObjectName { get; set; }

        [StringLength(255)]
        public string ObjectAddress { get; set; }

        [StringLength(255)]
        public string JournalMemo { get; set; }

        [StringLength(255)]
        public string InwardStockKeeper { get; set; }

        [StringLength(255)]
        public string OutwardStockKeeper { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }

        public bool IsPosted { get; set; }

        public int? PostVersion { get; set; }

        public int? EditVersion { get; set; }

        public int SortOrder { get; set; }

        public bool? IsExport { get; set; }

        public Guid? InvoiceTypeID { get; set; }

        [StringLength(20)]
        public string InvSeries { get; set; }

        [StringLength(50)]
        public string ContractNo { get; set; }

        [StringLength(255)]
        public string Transport { get; set; }

        [StringLength(255)]
        public string MobilizationNo { get; set; }

        public DateTime? MobilizationDate { get; set; }

        [StringLength(255)]
        public string MobilizationOf { get; set; }

        [StringLength(255)]
        public string MobilizationFor { get; set; }

        [StringLength(100)]
        public string CreatedBy { get; set; }

        [StringLength(100)]
        public string ModifiedBy { get; set; }

        public string Reference { get; set; }

        public int? Status { get; set; }

        public Guid? BranchID { get; set; }

        public Guid FromStockID { get; set; }

        public Guid ToStockID { get; set; }

        [StringLength(255)]
        public string Description { get; set; }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StockTransferDetail> StockTransferDetail { get; set; }
    }
}
