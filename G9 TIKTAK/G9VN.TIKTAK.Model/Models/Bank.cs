namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Bank")]
    public partial class Bank
    {
        [Key]
        public Guid BankID { get; set; }

        [StringLength(150)]
        public string BankAccount { get; set; }

        [StringLength(250)]
        public string BankName { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public bool Status { get; set; }
    }
}
