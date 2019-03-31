namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PricePolicy")]
    public partial class PricePolicy
    {
        
        [Key]
        public Guid PricePolicyID { get; set; }

        [StringLength(50)]
        public string PricePolicyCode { get; set; }

        [StringLength(150)]
        public string PricePolicyName { get; set; }

        public bool Status { get; set; }

        [StringLength(50)]
        public string ApplyFor { get; set; }

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
