using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class PrintFormViewModel
    {
        public Guid ID { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }
      
        public string HtmlHeader { get; set; }
        
        public string HtmlBody { get; set; }
    }
}