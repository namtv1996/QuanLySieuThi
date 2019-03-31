using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    //báo cáo sổ quỹ
    public class CashBook1ViewModel
    {
        //tồn cuối kỳ
        public decimal? a4 { get; set; }
        //số dư đầu kỳ
        public decimal? a3 { get; set; }
        //tổng thu
        public decimal? a1 { get; set; }
        //tổng chi
        public decimal? a2 { get; set; }
    }
}
