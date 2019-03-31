using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class SystemLogViewModel
    {
        public Guid SYSAuditingLogID { get; set; }

       
        public string UserName { get; set; }

       
        public string FunctionName { get; set; }

       
        public string ActionName { get; set; }

        
        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

    }
}