namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PublicInvoiceTypeDetail")]
    public partial class PublicInvoiceTypeDetail
    {
        [Key]
        public Guid PublicInvoiceTypeDetailID { get; set; }

        public Guid PublicInvoiceTypeID { get; set; }

        public Guid InvoiceTypeID { get; set; }

        [Required]
        [StringLength(100)]
        public string InvoiceTypeName { get; set; }

        [Required]
        [StringLength(50)]
        public string InvoiceSeries { get; set; }

        [Required]
        [StringLength(20)]
        public string FromInvNo { get; set; }

        [Required]
        [StringLength(20)]
        public string ToInvNo { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "date")]
        public DateTime UseDate { get; set; }

        [StringLength(255)]
        public string CompanyPrintedName { get; set; }

        [StringLength(50)]
        public string CompanyPrintedTax { get; set; }

        [StringLength(50)]
        public string ContractNo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ContractDate { get; set; }

        public virtual InvoiceType InvoiceType { get; set; }

        public virtual PublicInvoiceType PublicInvoiceType { get; set; }
    }
}
