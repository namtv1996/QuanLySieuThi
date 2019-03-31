using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ConfigurationStoreViewModel
    {
        public Guid ConfigurationStoreID { get; set; }

        public Guid ManageStoreID { get; set; }

        public string StoreName { get; set; }

        public decimal? SaleTaxDefault { get; set; }

        public decimal? PurchaseTaxDefault { get; set; }

        public Guid? SalePricePolicyDefault { get; set; }

        public Guid? PurchasePricePolicyDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }
    }
}