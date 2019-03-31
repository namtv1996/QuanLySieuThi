namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transporter")]
    public partial class Transporter
    {
        [Key]
        public Guid TransporterID { get; set; }

        [StringLength(50)]
        public string TransporterCode { get; set; }

        [StringLength(255)]
        public string TransporterName { get; set; }

        [StringLength(255)]
        public string Description { get; set; }
    }
}
