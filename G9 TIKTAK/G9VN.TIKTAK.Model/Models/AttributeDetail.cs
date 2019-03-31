using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("AttributeDetail")]
    public partial class AttributeDetail
    {
            [Key]
            public Guid AttributeDetailID { get; set; }
            public string value { get; set; }
            public Guid AttributeID { get; set; }
            public Guid ItemOptionID { get; set; }
    }
}
