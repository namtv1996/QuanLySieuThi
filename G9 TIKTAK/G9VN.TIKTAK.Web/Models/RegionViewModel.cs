using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class RegionViewModel
    {
        public Guid RegionID { get; set; }


        public string RegionCode { get; set; }


        public string RegionName { get; set; }

        public Guid? ParentID { get; set; }


        public bool IsParent { get; set; }

        public string ParentCode { get; set; }


        public int Grade { get; set; }


    }
}