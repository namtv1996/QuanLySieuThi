using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class NotificationsViewModel
    {
        public Guid NotificationID { get; set; }

        public string Contents { get; set; }

        public int? Status { get; set; }

        public Guid? ManageStoreID { get; set; }

        public DateTime? CreatedDate { get; set; }
    }
}