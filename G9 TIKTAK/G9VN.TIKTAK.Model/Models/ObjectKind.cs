namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ObjectKind")]
    public partial class ObjectKind
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int ObjectKindID { get; set; }

        [StringLength(100)]
        public string ObjectKindName { get; set; }

        public bool Status { get; set; }
    }
}