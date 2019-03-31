using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class SaleInvoiceDetailViewModel
    {
        public Guid VoucherDetailID { get; set; }

        public Guid VoucherID { get; set; }

        public Guid? ItemID { get; set; }

        public string Description { get; set; }

        public Guid? StockID { get; set; }

        public string DebitAccount { get; set; }

        public string CreditAccount { get; set; }

        public string Unit { get; set; }

        public string UnitConvert { get; set; }

        public decimal Quantity { get; set; }

        public decimal QuantityConvert { get; set; }

        public decimal UnitPriceOC { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal UnitPriceConvertOC { get; set; }

        public decimal UnitPriceConvert { get; set; }

        public decimal AmountOC { get; set; }

        public decimal Amount { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DiscountAmountOC { get; set; }

        public decimal DiscountAmount { get; set; }

        public string DiscountReason { get; set; }

        public string DiscountAccount { get; set; }

        public decimal VATRate { get; set; }

        public decimal VATAmountOC { get; set; }

        public decimal VATAmount { get; set; }

        public string VATAccount { get; set; }

        public string InventoryAccount { get; set; }

        public string COGAccount { get; set; }

        public decimal OutwardPrice { get; set; }

        public decimal OutwardAmount { get; set; }

        public Guid? ConfrontingVoucherID { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public string LotNo { get; set; }

        public string Warranty { get; set; }

        public Guid? AccountingObjectID { get; set; }

        public Guid? ContractID { get; set; }

        public Guid? StatisticItemID { get; set; }

        public int? SortOrder { get; set; }

        public decimal SpecialConsumeTaxRate { get; set; }

        public decimal SpecialConsumeTaxAmountOC { get; set; }

        public decimal SpecialConsumeTaxAmount { get; set; }

        public decimal SpecialConsumeUnitPriceOC { get; set; }

        public decimal SpecialConsumeUnitPrice { get; set; }

        public decimal ConvertRate { get; set; }

        public decimal UnitPriceAfterTaxOC { get; set; }

        public decimal UnitPriceAfterTax { get; set; }

        public decimal AmountAfterTaxOC { get; set; }

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

        public decimal OutwardPriceConvert { get; set; }

        public Guid? PurchasePurposeID { get; set; }

        public DateTime? VATPostedDate { get; set; }

        public int? InvType { get; set; }

        public DateTime? InvDate { get; set; }

        public string InvSeries { get; set; }

        public string InvNo { get; set; }

        public string CompanyTaxCode { get; set; }

        public Guid? AccountingObjectTaxID { get; set; }

        public string AccountingObjectTaxName { get; set; }

        public string InvoiceTypeID { get; set; }
    }
}