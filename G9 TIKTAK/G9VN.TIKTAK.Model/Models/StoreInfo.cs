namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("StoreInfo")]
    public partial class StoreInfo
    {
        [Key]
        [StringLength(150)]
        public string Version { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string DomainName { get; set; }

        [StringLength(250)]
        public string Desription { get; set; }

        public bool? Status { get; set; }
    }
}
