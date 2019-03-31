using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common.ViewsModel
{
    public class ProfitAndLossViewModel
    {
        //doanh thu bán hàng và cung cấp dịch vụ
        public decimal a1 { get; set; }
        // giảm trừ doanh thu 
        public decimal a2 { get; set; }
        // chiết khấu thương mại
        public decimal a2_1 { get; set; }
        // giá trị bán hàng trả lại 
        public decimal a2_2 { get; set; }
        //doanh thu thuần
        public decimal a3 { get; set; }
        //Giá vốn bán hàng (chi phí hàng hóa)
        public decimal a4 { get; set; }
        //Giá vốn xuất kho
        public decimal a4_1 { get; set; }
        //Giá nhập kho cho hàng bị trả lại
        public decimal a4_2 { get; set; }
        //Lợi nhuận gộp về bán hàng
        public decimal a5 { get; set; }
        //Chi phí
        public decimal a6 { get; set; }
        // thanh toán bằng điểm
        public decimal a6_1 { get; set; }
        //phí giao hàng trả đối tác
        public decimal a6_2 { get; set; }
        // thu nhập khác
        public decimal a7 { get; set; }
        //phiếu thu chủ động có hạch toán kinh doanh
        public decimal a7_1 { get; set; }
        //thu nhập khác từ trả hàng
        public decimal a7_2 { get; set; }
        // hoàn tiền cho khách trả hàng
        public decimal a7_2_1 { get; set; }
        //  chi phí khác
        public decimal a8 { get; set; }
        //lợi nhuận khác
        public decimal a9 { get; set; }
        //lợi nhuận ròng
        public decimal a10 { get; set; }
        //lợi nhuận thuần
        public decimal a11 { get; set; }
    }
}
