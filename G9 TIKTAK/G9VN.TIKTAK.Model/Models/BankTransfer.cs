namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BankTransfer")]
    public partial class BankTransfer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BankTransfer()
        {
            BankTransferDetail = new HashSet<BankTransferDetail>();
        }

        [Key]
        public Guid VoucherID { get; set; }

        public int? VoucherType { get; set; }

        [Column(TypeName = "date")]
        public DateTime? VoucherDate { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalAmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? TotalAmount { get; set; }

        public Guid? AccountID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BankTransferDetail> BankTransferDetail { get; set; }
    }
}
