namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BankTransferDetail")]
    public partial class BankTransferDetail
    {
        [Key]
        public Guid VoucherDetailID { get; set; }

        public Guid VoucherID { get; set; }

        [StringLength(50)]
        public string FromBankAccount { get; set; }

        [StringLength(100)]
        public string ToBankAccount { get; set; }

        [StringLength(255)]
        public string FromBankName { get; set; }

        [StringLength(255)]
        public string ToBankName { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountOC { get; set; }

        [Column(TypeName = "money")]
        public decimal? Amount { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public virtual BankTransfer BankTransfer { get; set; }
    }
}
