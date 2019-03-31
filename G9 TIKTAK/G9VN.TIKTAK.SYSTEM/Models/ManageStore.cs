namespace G9VN.TIKTAK.SYSTEM.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ManageStore")]
    public partial class ManageStore
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public ManageStore()
        //{
        //    ConfigurationStore = new HashSet<ConfigurationStore>();
        //}
        [Key]
        public Guid ManageStoreID { get; set; }

        [StringLength(256)]
        public string Address { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? Expirydate { get; set; }

        [StringLength(256)]
        public string StoreName { get; set; }

        [StringLength(256)]
        public string Business { get; set; }

        [StringLength(50)]
        public string Version { get; set; }

        [StringLength(200)]
        public string Logo { get; set; }
        public string Server { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<ConfigurationStore> ConfigurationStore { get; set; }
    }
}
