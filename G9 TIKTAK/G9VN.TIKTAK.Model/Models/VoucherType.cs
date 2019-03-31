namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VoucherType")]
    public partial class VoucherType
    {
        [Key]
        [Column("VoucherType")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int VoucherType1 { get; set; }

        [StringLength(250)]
        public string VoucherName { get; set; }

      
        public bool Status { get; set; }
    }
}
