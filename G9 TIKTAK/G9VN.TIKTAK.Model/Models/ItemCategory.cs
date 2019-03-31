namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ItemCategory")]
    public partial class ItemCategory
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(150)]
        public string Code { get; set; }

        [StringLength(250)]
        public string ItemCategoryName { get; set; }

        public Guid? ParentId { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public bool Status { get; set; }
    }
}
