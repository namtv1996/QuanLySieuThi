using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ItemTransferDetailViewModel
    {
        public Guid VoucherDetailID { get; set; }

        public Guid VoucherID { get; set; }

        public Guid ItemID { get; set; }


        public Guid? ConfrontingVoucherID { get; set; }
        public int? QuantityItem { get; set; }

        public int? transferPrice { get; set; }

        public int? importPrice { get; set; }

        public int? ConversionPrice { get; set; }


        public Guid StatisticItemID { get; set; }

        public int? SortOrder { get; set; }

        public string UnitConvert { get; set; }

        public decimal? ConvertRate { get; set; }

    }
}