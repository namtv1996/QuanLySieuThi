using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SaleInvoice1ViewModel
    {
        public string ObjectName { get; set; }
        public Guid VoucherID { get; set; }
        public string VoucherNo { get; set; }
        public String OriginalVoucherNo { get; set; }
        public DateTime? VoucherDate { get; set; }

        public int? VoucherType { get; set; }

        public Guid? ObjectID { get; set; }
        public Guid? TransporterID { get; set; }

        public DateTime? CABAVoucherDate { get; set; }

        public string CABAContactName { get; set; }

        public string BankAccount { get; set; }

        public string BankName { get; set; }

        public bool? BillPaid { get; set; }

        public int? InvType { get; set; }

        public DateTime? InvDate { get; set; }

        public string InvSeries { get; set; }

        public string InvNo { get; set; }

        public string InvJournalMemo { get; set; }

        public string InvContactName { get; set; }

        public string CompanyTaxCode { get; set; }

        public string CurrencyKindID { get; set; }

        public decimal? ExchangeRate { get; set; }

        public DateTime? DueDate { get; set; }

        public Guid? ShippingMethodID { get; set; }

        public string Employee { get; set; }

        public decimal TotalAmountOC { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal TotalDiscountAmountOC { get; set; }

        public decimal TotalDiscountAmount { get; set; }

        public decimal TotalVATAmountOC { get; set; }

        public decimal TotalVATAmount { get; set; }

        public decimal TotalOutwardAmount { get; set; }

        public bool IsPosted { get; set; }

        public int SortOrder { get; set; }

        public int? InvoiceForm { get; set; }

        public Guid? InvoiceTypeID { get; set; }

        public Guid? OutwardVoucherID { get; set; }

        public decimal? CommisionRate { get; set; }

        public decimal CommisionAmountOC { get; set; }

        public decimal CommisionAmount { get; set; }

        public string ListNo { get; set; }

        public DateTime? ListDate { get; set; }

        public bool IsAttachList { get; set; }

        public bool IsShowUnitConvert { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }
        public int StatusID { get; set; }
        public decimal DiscountRate { get; set; }

        public decimal DiscountAmountOC { get; set; }

        public decimal DiscountAmount { get; set; }
        public Guid? PromotionID { get; set; }
        public Guid? BranchID { get; set; }
    }
}
