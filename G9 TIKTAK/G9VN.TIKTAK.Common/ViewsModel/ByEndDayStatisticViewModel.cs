using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class ByEndDayStatisticViewModel
    {
        public int? StatusID { get; set; }
        
        public string InvoiceStatus { get; set; }

        public int? QuantitySaleOrder { get; set; }

        public decimal? Revenue { get; set; }
       
    }
}
