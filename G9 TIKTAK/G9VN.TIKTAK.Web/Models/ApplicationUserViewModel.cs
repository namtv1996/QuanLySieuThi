using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class ApplicationUserViewModel
    {
        public string Id { set; get; }
        public string FullName { set; get; }
        public DateTime BirthDay { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string UserName { set; get; }
        public string Address { set; get; }
        public string StoreName { get; set; }
        public string PhoneNumber { set; get; }
        public string Avatar { set; get; }
        public Guid BranchID { get; set; }
        public IEnumerable<ApplicationGroupViewModel> Groups { set; get; }
    }
}