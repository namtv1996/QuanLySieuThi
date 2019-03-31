namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ObjectCategory")]
    public partial class ObjectCategory
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public int? NumberObject { get; set; }

        public bool Status { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(100)]
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        [StringLength(100)]
        public string ModifyBy { get; set; }

        public int? ObjectKind { get; set; }

        public Guid? PricePolicyDefault { get; set; }

        public decimal? TaxRateDefault { get; set; }

        public decimal? DiscountRateDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }
       

    }
}
