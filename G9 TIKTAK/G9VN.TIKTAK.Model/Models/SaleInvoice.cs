namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("SaleInvoice")]
    public partial class SaleInvoice
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SaleInvoice()
        {
            SaleInvoiceDetail = new HashSet<SaleInvoiceDetail>();
        }

        [Key]
        public Guid VoucherID { get; set; }
        public Guid? PromotionID { get; set; }

        [StringLength(50)]
        public string VoucherNo { get; set; }

        [StringLength(50)]
        public string OriginalVoucherNo { get; set; }
       
        public DateTime? VoucherDate { get; set; }

        public int? VoucherType { get; set; }

        public Guid? ObjectID { get; set; }

        [StringLength(255)]
        public string ObjectName { get; set; }

        [StringLength(255)]
        public string ObjectAddress { get; set; }

        [StringLength(50)]
        public string ObjectTel { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CABAVoucherDate { get; set; }

        [StringLength(255)]
        public string CABAContactName { get; set; }

        [StringLength(50)]
        public string BankAccount { get; set; }

        [StringLength(50)]
        public string BankName { get; set; }

        public bool? BillPaid { get; set; }

        public int? InvType { get; set; }

        [Column(TypeName = "date")]
        public DateTime? InvDate { get; set; }

        [StringLength(20)]
        public string InvSeries { get; set; }

        [StringLength(20)]
        public string InvNo { get; set; }

        [StringLength(255)]
        public string InvJournalMemo { get; set; }

        [StringLength(255)]
        public string InvContactName { get; set; }

        [StringLength(50)]
        public string CompanyTaxCode { get; set; }

        [StringLength(3)]
        public string CurrencyKindID { get; set; }

        public decimal? ExchangeRate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DueDate { get; set; }

        public Guid? ShippingMethodID { get; set; }

        [StringLength(100)]
        public string Employee { get; set; }

        public decimal DiscountRate { get; set; }

        [Column(TypeName = "money")]
        public decimal DiscountAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalDiscountAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalDiscountAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalVATAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalVATAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal ShippingAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal TotalOutwardAmount { get; set; }

        public bool IsPosted { get; set; }

        public int SortOrder { get; set; }

        public int? InvoiceForm { get; set; }

        public Guid? InvoiceTypeID { get; set; }

        public Guid? OutwardVoucherID { get; set; }

        public decimal? CommisionRate { get; set; }

        [Column(TypeName = "money")]
        public decimal CommisionAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal CommisionAmount { get; set; }

        [StringLength(20)]
        public string ListNo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ListDate { get; set; }

        public bool IsAttachList { get; set; }

        public bool IsShowUnitConvert { get; set; }

        [StringLength(100)]
        public string CreatedBy { get; set; }

        [StringLength(100)]
        public string ModifiedBy { get; set; }

        public int StatusID { get; set; }

        public Guid? TransporterID { get; set; }
        public Guid? BranchID { get; set; }

        [StringLength(250)]
        public string Description { get; set; }
        public bool Debt { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SaleInvoiceDetail> SaleInvoiceDetail { get; set; }
    }
}
