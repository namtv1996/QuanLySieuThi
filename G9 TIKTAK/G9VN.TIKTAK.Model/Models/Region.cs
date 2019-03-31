namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Region")]
    public partial class Region
    {
        [Key]
        public Guid RegionID { get; set; }

        [Required]
        [StringLength(255)]
        public string RegionCode { get; set; }

        [Required]
        [StringLength(255)]
        public string RegionName { get; set; }

        public Guid? ParentID { get; set; }

        public bool IsParent { get; set; }

        [StringLength(255)]
        public string ParentCode { get; set; }

        public int Grade { get; set; }
    }
}
