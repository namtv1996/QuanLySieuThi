namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Item")]
    public partial class Item
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Item()
        {
            ItemOption = new HashSet<ItemOption>();
        }
        [Key]
        public Guid ItemID { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(150)]
        public string CreateBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        [StringLength(150)]
        public string ModifiedBy { get; set; }

        [StringLength(50)]
        public string Unit { get; set; }

        public Guid? ItemCategoryID { get; set; }

        [StringLength(150)]
        public string Brand { get; set; }

        [StringLength(250)]
        public string Image { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        public int? Quantity { get; set; }

        [StringLength(50)]
        public string Tags { get; set; }

        public bool Status { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ItemOption> ItemOption { get; set; }
    }
}
