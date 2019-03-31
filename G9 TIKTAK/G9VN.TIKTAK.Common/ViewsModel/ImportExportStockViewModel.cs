using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class ImportExportStockViewModel
    {
        public decimal PurchasePrice { get; set; } 
        public Guid ID { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        //số lượng tồn kho đầu kì
        public decimal a1 { get; set; }
        //giá trị tồn kho đầu kì
        public decimal a2 { get; set; }
        // số lượng nhập trong kì
        public decimal a3 { get; set; }
        // số lượng kiểm kê tăng trong kì
        public decimal a4 { get; set; }
        // số lượng nhận từ kho khác trong kì
        public decimal a5 { get; set; }
        // số lượng hàng trả lại trong kì 
        public decimal a6 { get; set; }
        // số lượng hàng hủy giao trong kì
        public decimal a7 { get; set; }
        // số lượng bán ra trong kì
        public decimal a8 { get; set; }
        // số lượng trả nhà cung cấp trong kì
        public decimal a9 { get; set; }
        // số lượng chuyển kho trong kì
        public decimal a10 { get; set; }
        // số lượng kiểm kê giảm trong kì
        public decimal a11 { get; set; }
        //  giá trị tăng
        public decimal a12 { get; set; }
        // giá trị giảm
        public decimal a13 { get; set; }
        // số lượng tồn cuối kì
        public decimal a14 { get; set; }
        // giá trị tồn cuối kì
        public decimal a15 { get; set; }
    }
}
