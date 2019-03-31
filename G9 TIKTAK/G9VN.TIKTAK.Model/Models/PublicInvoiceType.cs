namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PublicInvoiceType")]
    public partial class PublicInvoiceType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PublicInvoiceType()
        {
            PublicInvoiceTypeDetail = new HashSet<PublicInvoiceTypeDetail>();
        }
        [Key]
        public Guid PublicInvoiceTypeID { get; set; }

        public DateTime PublicDate { get; set; }

        [Required]
        [StringLength(50)]
        public string PublicNo { get; set; }

        [StringLength(255)]
        public string CompanyTaxName { get; set; }

        [StringLength(50)]
        public string ContactName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PublicInvoiceTypeDetail> PublicInvoiceTypeDetail { get; set; }
    }
}
