namespace G9VN.TIKTAK.SYSTEM.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Notifications")]
    public class Notifications
    {
        [Key]
        public Guid NotificationID { get; set; }

        [StringLength(600)]
        public string Contents { get; set; }

        public int? Status { get; set; }

        public Guid? ManageStoreID { get; set; }

        public DateTime? CreatedDate { get; set; }
    }
}
