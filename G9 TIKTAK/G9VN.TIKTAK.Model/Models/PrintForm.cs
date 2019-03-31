namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PrintForm")]
    public partial class PrintForm
    {
        [Key]
        public Guid ID { get; set; }

        [StringLength(50)]
        public string Code { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(4000)]
        public string HtmlHeader { get; set; }

        [StringLength(10000)]
        public string HtmlBody { get; set; }

    }
}
