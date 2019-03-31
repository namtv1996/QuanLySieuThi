using BotDetect.Web.Mvc;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Service;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace G9VN.TIKTAK.Web.Controllers
{
    public class MailHelperController : Controller
    {
      
        private IManageStoreService _manageStoreService;
       
        public MailHelperController()
        {
        }
        public MailHelperController( IManageStoreService _manageStoreService)
        {
            this._manageStoreService = _manageStoreService;
        }
       
        [HttpGet]
        public ActionResult MailHelper()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> MailHelper(FormCollection fc)
        {
         
            if (ModelState.IsValid)
            {
                string host = HttpContext.Request.Url.Host;
                var lsStore = _manageStoreService.GetStore(host);
                try
                {
                            string content = System.IO.File.ReadAllText(Server.MapPath("/Assets/client/template/Notification.html"));
                            content = content.Replace("{{NameStore}}", lsStore.StoreName);
                            content = content.Replace("{{UserName}}",fc["UserName"]);
                            content = content.Replace("{{PhomeNumber}}",fc["PhomeNumber"]);
                            MailHelperSP.SendMail("sales@tiktac.vn", "Thông báo gia hạn cho cửa hàng -"+ lsStore.StoreName, content);
                }
                catch (Exception ex)
                {
                    string filePath = HttpContext.Server.MapPath("~\\Error.txt");

                    using (StreamWriter writer = new StreamWriter(filePath, true))
                    {
                        writer.WriteLine("Message :" + ex.Message + "<br/>" + Environment.NewLine + "StackTrace :" + ex.StackTrace +
                           "" + Environment.NewLine + "Date :" + DateTime.Now.ToString());
                        writer.WriteLine(Environment.NewLine + "-----------------------------------------------------------------------------" + Environment.NewLine);
                    }
                }
                return Redirect("http://tiktac.vn");
            }

            return View();
        }

    }
}
