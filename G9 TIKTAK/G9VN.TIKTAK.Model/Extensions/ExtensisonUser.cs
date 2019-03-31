using G9VN.TIKTAK.SYSTEM.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Linq;

namespace G9VN.TIKTAK.Model.Extensions
{
    public class ExtensisonUser : IDisposable
    {
        private static TIKTAK_SYSTEM_DbContext dataContext;

        public static string GetStoreName(string name)
        {
            if (name != "")
            {
                dataContext = new TIKTAK_SYSTEM_DbContext();

                ApplicationUser user = dataContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == name).Single();

                return user.StoreName;
            }
            return "";
        }
        public void Dispose()
        {
            dataContext.Dispose();
        }
    }
}