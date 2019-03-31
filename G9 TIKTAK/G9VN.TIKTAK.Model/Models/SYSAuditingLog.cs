namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SYSAuditingLog")]
    public partial class SYSAuditingLog
    {
        [Key]
        public Guid SYSAuditingLogID { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        [StringLength(100)]
        public string FunctionName { get; set; }

        [StringLength(50)]
        public string ActionName { get; set; }

        [StringLength(255)]
        public string Desciption { get; set; }

        public DateTime? CreateDate { get; set; }

    }
}
