namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Partner")]
    public partial class Partner
    {
        [Key]
        public Guid ID { get; set; }
        public bool? Status { get; set; }
        [StringLength(50)]
        public string StoreName { get; set; }
        [StringLength(50)]
        public string PartnerName { get; set; }
        [StringLength(50)]
        public string NameSignIn { get; set; }
        [StringLength(50)]
        public string PassSignIn { get; set; }
        public Guid? BankID { get; set; }
    }
}
