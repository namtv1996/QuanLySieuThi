using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("ComboDetail")]
    public class ComboDetail
    {
        [Key]

        public Guid ID { get; set; }

        public Guid ComboID { get; set; }

        public Guid ItemID { get; set; }

        public decimal? QuantityItem { get; set; }

        public int? TransferPrice { get; set; }

        public decimal TotalAmount { get; set; }


    }
}
