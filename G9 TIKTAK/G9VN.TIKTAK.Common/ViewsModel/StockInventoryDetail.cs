using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class StockInventoryDetail
    {

        public string branchname { get; set; }
        public Decimal quantity { get; set; }
        public Decimal initialinventory { get; set; }
        public Guid branchId { get; set; }
    }
}
