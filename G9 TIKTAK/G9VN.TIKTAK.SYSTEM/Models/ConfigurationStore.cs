namespace G9VN.TIKTAK.SYSTEM.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ConfigurationStore")]
    public partial class ConfigurationStore
    {
        [Key]
        public Guid ConfigurationStoreID { get; set; }

        public Guid ManageStoreID { get; set; }

        [StringLength(256)]
        public string StoreName { get; set; }

        public decimal? SaleTaxDefault { get; set; }

        public decimal? PurchaseTaxDefault { get; set; }

        public Guid? SalePricePolicyDefault { get; set; }

        public Guid? PurchasePricePolicyDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }

    }
}
