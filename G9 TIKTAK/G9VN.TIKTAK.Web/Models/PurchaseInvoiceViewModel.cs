using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class PurchaseInvoiceViewModel
    {
        public Guid VoucherID { get; set; }

       
        public DateTime? INVoucherDate { get; set; }

       
        public string INVoucherNo { get; set; }

        public int VoucherType { get; set; }

        public Guid? ObjectID { get; set; }

        public Guid? InwardStockID { get; set; }

        public string ObjectName { get; set; }

       
        public string ObjectAddress { get; set; }

        public Guid? BranchID { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string INContactName { get; set; }

       
        public string INJournalMemo { get; set; }

       
        public string OriginalVoucherNo { get; set; }

        
        public DateTime? CABAVoucherDate { get; set; }

        
        public string CABAVoucherNo { get; set; }

      
        public string AccountingObjectBankAccount { get; set; }

       
        public string AccountingObjectBankName { get; set; }

        
        public string CABAContactName { get; set; }

      
        public string BankAccount { get; set; }

      
        public string BankName { get; set; }

      
        public string CreditCardNo { get; set; }

        public bool BillReceived { get; set; }

       
        public string CurrencyKindID { get; set; }

        public decimal? ExchangeRate { get; set; }

        public Guid? PaymentTermID { get; set; }

        public DateTime? DueDate { get; set; }

        public Guid? ShippingMethodID { get; set; }

        public Guid? EmployeeID { get; set; }

        public bool IsImportPurchase { get; set; }

        public bool SpecialConsumeTax { get; set; }

        public int? InvoiceExportStatus { get; set; }

        public int? StockImportStatus { get; set; }

        public int? PaymentStatus { get; set; }

        public int TotalPurchaseQuantity { get; set; }

        public decimal TotalAmountOC { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal TotalPaymentAmount { get; set; }

        public decimal TotalImportTaxAmountOC { get; set; }

       
        public decimal TotalImportTaxAmount { get; set; }

       
        public decimal TotalVATAmountOC { get; set; }

      
        public decimal TotalVATAmount { get; set; }

      
        public decimal TotalDiscountAmountOC { get; set; }

      
        public decimal TotalDiscountAmount { get; set; }

        public decimal DiscountForInvoice { get; set; }

        public decimal TotalFreightAmountOC { get; set; }

      
        public decimal TotalFreightAmount { get; set; }

       
        public decimal TotalOutwardAmountOC { get; set; }

       
        public decimal TotalOutwardAmount { get; set; }

      
        public DateTime? ReconciledDate { get; set; }

        public bool Reconciled { get; set; }

        public bool IsPosted { get; set; }

        public Guid? LayoutID { get; set; }

        public int SortOrder { get; set; }

        public int? EditVersion { get; set; }

        public int? PostVersion { get; set; }

        public bool IsAttachList { get; set; }

      
        public string ListCommonNameInventory { get; set; }

        public bool IsShowUnitConvert { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        public string ModifiedBy { get; set; }

      
        public decimal TotalImportTaxExpenseAmountOC { get; set; }

      
        public decimal TotalImportTaxExpenseAmount { get; set; }

        public int? Status { get; set; }

        public string Description { get; set; }
    }
}