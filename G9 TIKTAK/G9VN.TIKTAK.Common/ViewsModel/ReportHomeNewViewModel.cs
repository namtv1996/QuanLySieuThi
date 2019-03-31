using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class ReportHomeNewViewModel
    {
        public int? customerlength { get; set; }
        public decimal? TotalStock { get; set; }
        public int? itemlength { get; set; }
        public decimal? totalRevenue { get; set; }
    }
}
