namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Object")]
    public partial class Object1
    {
        [Key]
        public Guid ObjectID { get; set; }

        [StringLength(50)]
        public string ObjectCode { get; set; }

        [StringLength(255)]
        public string ObjectName { get; set; }

        public Guid? ObjectCategoryID { get; set; }

        [StringLength(255)]
        public string ObjectAddress { get; set; }

        [StringLength(255)]
        public string ObjectState { get; set; }
        [StringLength(255)]
        public string ObjectDistrict { get; set; }
        [StringLength(255)]
        public string ObjectWard { get; set; }
        [StringLength(50)]
        public string Tel { get; set; }

        [StringLength(50)]
        public string BankAccount { get; set; }

        [StringLength(255)]
        public string BankName { get; set; }

        [StringLength(50)]
        public string TaxCode { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [Column(TypeName = "money")]
        public decimal? DiscountRate { get; set; }

        public DateTime? BirthdayDate { get; set; }

        public int? AccumulativePoint { get; set; }

        [Column(TypeName = "money")]
        public decimal? Debt { get; set; }

        public int? ObjectKind { get; set; }

        public bool Status { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(100)]
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        [StringLength(100)]
        public string ModifyBy { get; set; }

        public Guid? CaringStaff { get; set; }

        [StringLength(10)]
        public string Sex { get; set; }
        public Guid? BranchID { get; set; }

        public int? ApplyIncentives { get; set; }

        public Guid? PricePolicyDefault { get; set; }

        public decimal? TaxRateDefault { get; set; }

        public decimal? DiscountRateDefault { get; set; }

        public int? PaymentMethodDefault { get; set; }

        public Guid? PaymentScheduleDefault { get; set; }
    }
}
