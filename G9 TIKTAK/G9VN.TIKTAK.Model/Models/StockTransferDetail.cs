namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("StockTransferDetail")]
    public partial class StockTransferDetail
    {
        [Key]
        public Guid VoucherDetailID { get; set; }

        public Guid VoucherID { get; set; }

        public Guid ItemID { get; set; }

        public Guid? ConfrontingVoucherID { get; set; }

        public int? QuantityItem { get; set; }

        public int? TransferPrice { get; set; }

        public int? ImportPrice { get; set; }

        public int? ConversionPrice { get; set; }

        public Guid? StatisticItemID { get; set; }

        public int? SortOrder { get; set; }

        [StringLength(20)]
        public string UnitConvert { get; set; }

        public decimal? ConvertRate { get; set; }

        public virtual StockTransfer StockTransfer { get; set; }
    }
}
