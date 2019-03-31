using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ItemTransferViewModel
    {
        public Guid VoucherID { get; set; }

        public int VoucherType { get; set; }

        public DateTime VoucherDate { get; set; }

        public string VoucherNo { get; set; }

        public Guid? ObjectID { get; set; }

        public string ObjectName { get; set; }

        public string ObjectAddress { get; set; }

        public string JournalMemo { get; set; }

        public string InwardStockKeeper { get; set; }

        public string OutwardStockKeeper { get; set; }

        public decimal TotalAmount { get; set; }

        public bool IsPosted { get; set; }

        public int? PostVersion { get; set; }

        public int? EditVersion { get; set; }

        public int SortOrder { get; set; }

        public bool? IsExport { get; set; }

        public Guid? InvoiceTypeID { get; set; }

        public string InvSeries { get; set; }

        public string ContractNo { get; set; }

        public string Transport { get; set; }

        public string MobilizationNo { get; set; }

        public DateTime? MobilizationDate { get; set; }

        public string MobilizationOf { get; set; }

        public string MobilizationFor { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }
        public string Reference { get; set; }

        public int? Status { get; set; }

        public Guid? BranchID { get; set; }

        public Guid FromStockID { get; set; }

        public Guid ToStockID { get; set; }
      
        public string Description { get; set; }

    }
}