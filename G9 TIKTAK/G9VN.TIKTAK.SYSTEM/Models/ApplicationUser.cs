using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.SYSTEM.Models
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(256)]
        public string FullName { set; get; }

        [StringLength(256)]
        public string Address { set; get; }

        public DateTime? BirthDay { set; get; }

        [StringLength(256)]
        public string StoreName { get; set; }

        [StringLength(250)]
        public string Avatar { get; set; }

        public Guid ManageStoreID { get; set; }
        public Guid BranchID { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }
}