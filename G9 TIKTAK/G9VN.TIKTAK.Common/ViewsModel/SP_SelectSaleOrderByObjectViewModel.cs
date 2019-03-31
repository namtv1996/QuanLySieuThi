using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class SP_SelectSaleOrderByObjectViewModel
    {
        public Guid VoucherID { get; set; }
        public string VoucherNo { get; set; }
        public DateTime VoucherDate { get; set; }
        public int StatusID { get; set; }
        public decimal DebtAmount { get; set; }
    }
}
