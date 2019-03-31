namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PaymentSchedule")]
    public partial class PaymentSchedule
    {
        [Key]
        public Guid PaymentScheduleID { get; set; }

        [StringLength(100)]
        public string PaymentScheduleName { get; set; }

        public int? PayWithin { get; set; }

        public bool? IsDefault { get; set; }

        public bool Status { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(100)]
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        [StringLength(100)]
        public string ModifyBy { get; set; }
    }
}
