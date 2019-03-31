namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VoucherCheck")]
    public partial class VoucherCheck
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public VoucherCheck()
        {
            VoucherCheckDetail = new HashSet<VoucherCheckDetail>();
        }
        [Key]
        public Guid VoucherID { get; set; }

        [StringLength(20)]
        public string VoucherCode { get; set; }

        public int? VoucherType { get; set; }

        public Guid? ObjectID { get; set; }

        public Guid? BranchID { get; set; }

        public DateTime? VoucherDate { get; set; }

        [StringLength(50)]
        public string Tags { get; set; }

        [StringLength(250)]
        public string Note { get; set; }

        public int? TotalAfterCheck { get; set; }

        public int? TotalDifference { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string CreateBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        [StringLength(50)]
        public string ModifyBy { get; set; }

        public bool? Status { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        public DateTime? EndUpdate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VoucherCheckDetail> VoucherCheckDetail { get; set; }

    }
}
