namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PurchaseInvoice")]
    public partial class PurchaseInvoice
    {
        [Key]
        public Guid VoucherID { get; set; }

        public DateTime? INVoucherDate { get; set; }

        [StringLength(20)]
        public string INVoucherNo { get; set; }

        public int VoucherType { get; set; }

        public Guid? InwardStockID { get; set; }

        public Guid? ObjectID { get; set; }

        [StringLength(255)]
        public string ObjectName { get; set; }

        [StringLength(255)]
        public string ObjectAddress { get; set; }

        public Guid? BranchID { get; set; }

        public DateTime? DeliveryDate { get; set; }

        [StringLength(255)]
        public string INContactName { get; set; }

        [StringLength(255)]
        public string INJournalMemo { get; set; }

        [StringLength(20)]
        public string OriginalVoucherNo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CABAVoucherDate { get; set; }

        [StringLength(20)]
        public string CABAVoucherNo { get; set; }

        [StringLength(50)]
        public string AccountingObjectBankAccount { get; set; }

        [StringLength(255)]
        public string AccountingObjectBankName { get; set; }

        [StringLength(255)]
        public string CABAContactName { get; set; }

        [StringLength(50)]
        public string BankAccount { get; set; }

        [StringLength(255)]
        public string BankName { get; set; }

        [StringLength(50)]
        public string CreditCardNo { get; set; }

        public bool? BillReceived { get; set; }

        [StringLength(3)]
        public string CurrencyKindID { get; set; }

        public decimal? ExchangeRate { get; set; }

        public Guid? PaymentTermID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DueDate { get; set; }

        public Guid? ShippingMethodID { get; set; }

        public Guid? EmployeeID { get; set; }

        public bool? IsImportPurchase { get; set; }

        public bool? SpecialConsumeTax { get; set; }

        public int? InvoiceExportStatus { get; set; }

        public int? StockImportStatus { get; set; }

        public int? PaymentStatus { get; set; }

        public int? TotalPurchaseQuantity { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalPaymentAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalImportTaxAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalImportTaxAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalVATAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalVATAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? DiscountForInvoice { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalDiscountAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalDiscountAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalFreightAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalFreightAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalOutwardAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalOutwardAmount { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ReconciledDate { get; set; }

        public bool? Reconciled { get; set; }

        public bool? IsPosted { get; set; }

        public Guid? LayoutID { get; set; }

        public int? SortOrder { get; set; }

        public int? EditVersion { get; set; }

        public int? PostVersion { get; set; }

        public bool? IsAttachList { get; set; }

        [StringLength(255)]
        public string ListCommonNameInventory { get; set; }

        public bool? IsShowUnitConvert { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(100)]
        public string CreatedBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        [StringLength(100)]
        public string ModifiedBy { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalImportTaxExpenseAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalImportTaxExpenseAmount { get; set; }

        public int? Status { get; set; }

        [StringLength(250)]
        public string Description { get; set; }
    }
}
