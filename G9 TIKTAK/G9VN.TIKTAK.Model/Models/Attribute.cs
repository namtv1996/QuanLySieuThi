using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("Attribute")]
    public partial class Attribute
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Attribute()
        {
            AttributeDetail = new HashSet<AttributeDetail>();
        
        }
        [Key]

            public Guid AttributeID { get; set; }
            public string Name { get; set; }
            public bool Status { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AttributeDetail> AttributeDetail { get; set; }
       
    }
}
