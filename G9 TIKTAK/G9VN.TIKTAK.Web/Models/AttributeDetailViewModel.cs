using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class AttributeDetailViewModel
    {
        public Guid AttributeDetailID { get; set; }
        public string value { get; set; }
        public Guid AttributeID { get; set; }
        public Guid ItemOptionID { get; set; }
    }

}