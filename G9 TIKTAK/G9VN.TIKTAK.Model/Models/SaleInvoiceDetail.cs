namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SaleInvoiceDetail")]
    public partial class SaleInvoiceDetail
    {
        [Key]
        public Guid VoucherDetailID { get; set; }

        public Guid VoucherID { get; set; }

        public Guid? ItemID { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public Guid? StockID { get; set; }

        [StringLength(20)]
        public string DebitAccount { get; set; }

        [StringLength(20)]
        public string CreditAccount { get; set; }

        [StringLength(50)]
        public string Unit { get; set; }

        [StringLength(50)]
        public string UnitConvert { get; set; }

        public decimal? Quantity { get; set; }

        public decimal QuantityConvert { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceOC { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceConvertOC { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceConvert { get; set; }

        [Column(TypeName = "money")]
        public decimal AmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal Amount { get; set; }

        public decimal DiscountRate { get; set; }

        [Column(TypeName = "money")]
        public decimal DiscountAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal DiscountAmount { get; set; }

        [StringLength(100)]
        public string DiscountReason { get; set; }

        [StringLength(20)]
        public string DiscountAccount { get; set; }

        public decimal VATRate { get; set; }

        [Column(TypeName = "money")]
        public decimal VATAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal VATAmount { get; set; }

        [StringLength(20)]
        public string VATAccount { get; set; }

        [StringLength(20)]
        public string InventoryAccount { get; set; }

        [StringLength(20)]
        public string COGAccount { get; set; }

        [Column(TypeName = "money")]
        public decimal OutwardPrice { get; set; }

        [Column(TypeName = "money")]
        public decimal OutwardAmount { get; set; }

        public Guid? ConfrontingVoucherID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ExpiryDate { get; set; }

        [StringLength(50)]
        public string LotNo { get; set; }

        [StringLength(255)]
        public string Warranty { get; set; }

        public Guid? AccountingObjectID { get; set; }

        public Guid? ContractID { get; set; }

        public Guid? StatisticItemID { get; set; }

        public int? SortOrder { get; set; }

        public decimal SpecialConsumeTaxRate { get; set; }

        [Column(TypeName = "money")]
        public decimal SpecialConsumeTaxAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal SpecialConsumeTaxAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal SpecialConsumeUnitPriceOC { get; set; }

        [Column(TypeName = "money")]
        public decimal SpecialConsumeUnitPrice { get; set; }

        public decimal ConvertRate { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceAfterTaxOC { get; set; }

        [Column(TypeName = "money")]
        public decimal UnitPriceAfterTax { get; set; }

        [Column(TypeName = "money")]
        public decimal AmountAfterTaxOC { get; set; }

        [Column(TypeName = "money")]
        public decimal AmountAfterTax { get; set; }

        public decimal DiscountAmountAfterTax { get; set; }

        public decimal DiscountAmountAfterTaxOC { get; set; }

        public Guid? DepartmentID { get; set; }

        public Guid? CreditAccountingObjectID { get; set; }

        public Guid? ConfrontingVoucherDetailID { get; set; }

        public Guid? ContractVoucherDetailID { get; set; }

        public int? OutwardPurpose { get; set; }

        public Guid? JobID { get; set; }

        public Guid? ExpenseItemID { get; set; }

        [Column(TypeName = "money")]
        public decimal OutwardPriceConvert { get; set; }

        public Guid? PurchasePurposeID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? VATPostedDate { get; set; }

        public int? InvType { get; set; }

        [Column(TypeName = "date")]
        public DateTime? InvDate { get; set; }

        [StringLength(20)]
        public string InvSeries { get; set; }

        [StringLength(20)]
        public string InvNo { get; set; }

        [StringLength(50)]
        public string CompanyTaxCode { get; set; }

        public Guid? AccountingObjectTaxID { get; set; }

        [StringLength(255)]
        public string AccountingObjectTaxName { get; set; }

        [StringLength(50)]
        public string InvoiceTypeID { get; set; }

        public virtual SaleInvoice SaleInvoice { get; set; }
    }
}
