using BotDetect.Web.Mvc;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.SYSTEM.Models;
using G9VN.TIKTAK.Web.App_Start;
using G9VN.TIKTAK.Web.Models;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace G9VN.TIKTAK.Web.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private IManageStoreService _manageStoreService;
        private IConfigurationStoreService _configurationStoreService;
        private IApplicationRoleService _appRoleService;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager, IApplicationRoleService appRoleService,
            IManageStoreService _manageStoreService, IConfigurationStoreService configurationStoreService)
        {
            this._manageStoreService = _manageStoreService;
            _configurationStoreService = configurationStoreService;
            UserManager = userManager;
            SignInManager = signInManager;
            _appRoleService = appRoleService;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        //[CaptchaValidation("CaptchaCode", "registerCaptcha", "Mã xác nhận không đúng")]
        public async Task<ActionResult> Register(FormCollection fc)
        {
            RegisterViewModel model = new RegisterViewModel();
            model.FullName = fc["FullName"];
            model.Address = fc["Address"];
            model.Email = fc["Email"];
            model.PhoneNumber = fc["PhoneNumber"];
            model.UserName = fc["UserName"];
            model.StoreName = fc["StoreName"];
            model.Business = fc["Business"];
            model.Password = fc["Password"];

            if (ModelState.IsValid)
            {
                //kiem tra xem da ton tai cua hang nao hay chua
                List<ManageStore> lsStore = _manageStoreService.GetAll().ToList();
                int storeByStoreName = lsStore.FindIndex(x => x.StoreName == model.StoreName);
                if (storeByStoreName != -1)
                {
                    ModelState.AddModelError("StoreName", "StoreName đã tồn tại");
                    return View(model);
                }
                if (model.StoreName.IndexOf(' ') != -1)
                {
                    ModelState.AddModelError("StoreName", "StoreName không được viết ký tự trắng");
                    return View(model);
                }
                if (model.UserName.IndexOf(' ') != -1)
                {
                    ModelState.AddModelError("UserName", "UserName không được viết ký tự trắng");
                    return View(model);
                }
                var userByUserName = await _userManager.FindByNameAsync(model.UserName);
                if (userByUserName != null)
                {
                    ModelState.AddModelError("email", "Tài khoản đã tồn tại");
                    return View(model);
                }
                //them store
                ManageStore store = new ManageStore()
                {
                    ManageStoreID = Guid.NewGuid(),
                    Address = model.Address,
                    CreateDate = DateTime.Now,
                    Expirydate = DateTime.Now.AddDays(7),
                    StoreName = model.StoreName,
                    Business = model.Business,
                    Version = Assembly.GetExecutingAssembly().GetName().Version.ToString()
                };
                var st = _manageStoreService.Add(store);

                ConfigurationStore config = new ConfigurationStore()
                {
                    ConfigurationStoreID = Guid.NewGuid(),
                    ManageStoreID = st.ManageStoreID,
                    StoreName = st.StoreName,
                    SaleTaxDefault = 0,
                    PurchaseTaxDefault = 0,
                    SalePricePolicyDefault = Guid.Parse("3048ffe8-e2c8-4b43-a8a5-766ad6643a83"),
                    PurchasePricePolicyDefault= Guid.Parse("155acc95-47be-4169-a73a-872aec588f54"),
                    PaymentMethodDefault = 1,
                    PaymentScheduleDefault = null
                };
                _configurationStoreService.Add(config);
                _configurationStoreService.SaveChanges();

                try
                {
                    // tạo database
                    //string sBackupFile = HttpContext.Server.MapPath("~\\G9_SALES_TIKTAC.g9bk");
                    string sBackupFile = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\G9_SALES_TIKTAC.g9bk";
                    string sDBName = "G9TIKTAC_" + store.StoreName;
                    string sPath = @"C:\Program Files\Microsoft SQL Server\MSSQL10_50.TIKTAC\MSSQL\DATA";
                    string connectionStringName = "DbContext_" + store.StoreName;
                    int iFileNumber;
                    DataTable dtBackupSet = default(DataTable);
                    ConnectDatabase.ConnectServer();
                    dtBackupSet = ConnectDatabase.LoadBackupFile(sBackupFile);
                    if (dtBackupSet.Rows.Count > 0)
                    {
                        iFileNumber = System.Convert.ToInt32(dtBackupSet.Rows[0]["FileNumber"]);
                        if (ConnectDatabase.RestoreDatabase(sDBName, sBackupFile, iFileNumber, sPath))
                        {
                            ConnectDatabase.AddConnectionString(sDBName, connectionStringName);
                            //them moi user

                            var user = new ApplicationUser()
                            {
                                UserName = model.UserName,
                                Email = model.Email,
                                EmailConfirmed = true,
                                BirthDay = DateTime.Now,
                                FullName = model.FullName,
                                PhoneNumber = model.PhoneNumber,
                                Address = model.Address,
                                ManageStoreID = st.ManageStoreID,
                                StoreName = model.StoreName
                            };

                            await _userManager.CreateAsync(user, model.Password);
                            var adminUser = await _userManager.FindByNameAsync(model.UserName);

                            var listRole = _appRoleService.GetAll();
                            foreach (var role in listRole)
                            {
                                if (role.Id != "cf7a3ef4-fcd3-4bc9-8cb7-b8b77b550f39" &&
                                   role.Id != "7430a544-ec64-4e9d-945f-f21d4090dd1a" &&
                                   role.Id != "5888f532-3b16-454a-863e-23a0cf2cfb86")
                                {
                                    await _userManager.RemoveFromRoleAsync(adminUser.Id, role.Name);
                                    await _userManager.AddToRoleAsync(adminUser.Id, role.Name);
                                }
                            }

                            string content = System.IO.File.ReadAllText(Server.MapPath("/Assets/client/template/newuser.html"));
                            content = content.Replace("{{FullName}}", adminUser.FullName);
                            content = content.Replace("{{Address}}", adminUser.Address);
                            content = content.Replace("{{Email}}", adminUser.Email);
                            content = content.Replace("{{PhoneNumber}}", adminUser.PhoneNumber);
                            content = content.Replace("{{UserName}}", adminUser.UserName);
                            content = content.Replace("{{StoreName}}", adminUser.StoreName);
                            content = content.Replace("{{Business}}", fc["Business"]);
                            content = content.Replace("{{Password}}", fc["Password"]);
                            content = content.Replace("{{Link}}", ConfigHelper.GetByKey("CurrentLink") + "#!login");
                            content = content.Replace("{{LinkStore}}", "http://" + store.StoreName + ".tiktac.vn/#!/login");
                            MailHelperSP.SendMail(adminUser.Email, "Thông báo đăng ký thành công tiktac", content);
                        }
                    }
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
                return Redirect("http://" + store.StoreName + ".tiktac.vn");
            }

            return View();
        }

    }
}
