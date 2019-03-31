using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace G9VN.TIKTAK.Model.Models
{
    [Table("Errors")]
    public class Error
    {
        [Key]
        public Guid ErrorID { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}