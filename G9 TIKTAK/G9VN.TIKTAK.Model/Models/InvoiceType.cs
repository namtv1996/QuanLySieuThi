namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("InvoiceType")]
    public partial class InvoiceType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InvoiceType()
        {
            PublicInvoiceTypeDetail = new HashSet<PublicInvoiceTypeDetail>();
        }
        [Key]
        public Guid InvoiceTypeID { get; set; }

        [Required]
        [StringLength(25)]
        public string InvoiceTypeCode { get; set; }

        public Guid? ParentID { get; set; }

        [Required]
        [StringLength(255)]
        public string InvoiceTypeName { get; set; }

        public bool Inactive { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PublicInvoiceTypeDetail> PublicInvoiceTypeDetail { get; set; }
    }
}
