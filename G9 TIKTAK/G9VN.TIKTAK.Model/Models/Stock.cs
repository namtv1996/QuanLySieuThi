namespace G9VN.TIKTAK.Model.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Stock")]
    public partial class Stock
    {
        [Key]
        public Guid StockID { get; set; }

        public Guid ItemOptionID { get; set; }

        public Guid BranchID { get; set; }
        //số lượng tồn hiện tại trong kho
        public decimal Quantity { get; set; }
        //tồn kho ban đầu, chỉ khởi tạo 1 lần khi khai báo, ko bao giờ thay đổi
        public decimal InitialInventory { get; set; }
    }
}
