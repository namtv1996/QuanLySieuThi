using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("salesPromotion")]
    public class SalesPromotion
    {
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        
        public SalesPromotion()
        {
            salesPromotionDetail = new HashSet<SalesPromotionDetail>();
        }
        [Key]
        public Guid VoucherID { get; set; }
        public String PromotionName { get; set; }
        public int VoucherType { get; set; }

        [StringLength(50)]
        public string VoucherNo { get; set; }
        public DateTime VoucherDate { get; set; }
        public int ApplyQuantity { get; set; }

        [StringLength(255)]
        public string Description { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? Expirydate { get; set; }
        public Guid? Object { get; set; }
        public bool Status { get; set; }
        public Guid? BranchID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SalesPromotionDetail>salesPromotionDetail { get; set; }
    }
}
