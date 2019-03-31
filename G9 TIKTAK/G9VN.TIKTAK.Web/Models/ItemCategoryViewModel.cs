using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ItemCategoryViewModel
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string ItemCategoryName { get; set; }

        public Guid? ParentId { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

    }
}