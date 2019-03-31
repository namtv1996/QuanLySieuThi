using G9VN.TIKTAK.Common.ViewsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class DashBoardHomeViewModel
    {
        public ReportHomeNewViewModel reportHomeNewViewModel { get; set; }
        public List<ReportHomeViewModel> listReportHomeViewModel { get; set; }
        public List<SaleInvoiceViewModel> listSaleInvoiceViewModel { get; set; }
    }
}