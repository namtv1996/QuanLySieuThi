using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class DeliveryOrderViewModel
    {
        public Guid? VoucherID { get; set; }
        public string VoucherNo { get; set; }
        public int? VoucherType { get; set; }
        public string OriginalVoucherNo { get; set; }
        public Guid? BranchID { get; set; }
        public Guid? PackageID { get; set; }
        public string PackageVoucherNo { get; set; }
        public Guid? SaleOrderID { get; set; }
        public string SaleOrderVoucherNo { get; set; }
        public Guid? ObjectID { get; set; }
        public string ObjectName { get; set; }
        public string ObjectAddress { get; set; }
        public string ObjectTel { get; set; }
        public Guid? TransporterID { get; set; }
        public string TransporterName { get; set; }
        public DateTime? VoucherDate { get; set; }
        public int? StatusID { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? ShippingAmount { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public string Employee { get; set; }

    }
}
