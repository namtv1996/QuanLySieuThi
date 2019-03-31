using AutoMapper;
using G9VN.TIKTAK.Exceptions;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.SYSTEM.Models;
using G9VN.TIKTAK.Web.App_Start;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.IO;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Model.Models;
using System.Drawing;
using System.Web;
namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/ManageStore")]
    public class ManageStoreController : ApiControllerBase
    {
     
        private IManageStoreService _ManageStoreService;

        public ManageStoreController(
            IManageStoreService storeStoreService,
            IErrorService errorService)
            : base(errorService)
        {
            _ManageStoreService = storeStoreService;
          
        }
        [Route("getbynamestore")]
        [HttpGet]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            var listNameStore = _ManageStoreService.getStoreName(key);

            var listNameStoreVm = Mapper.Map<List<ManageStoreViewModel>>(listNameStore);

            HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listNameStoreVm);

            return response;
        }

        [Route("getNotification")]
        [HttpGet]
        public HttpResponseMessage getNotification(HttpRequestMessage request, Guid id)
        {
            var listNameStore = _ManageStoreService.getNotification(id);

            var listNameStoreVm = Mapper.Map<List<NotificationsViewModel>>(listNameStore);

            HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listNameStoreVm);

            return response;
        }

        [Route("updateNotifi")]
        [HttpPut]
        public HttpResponseMessage UpdateNotifi(HttpRequestMessage request, NotificationsViewModel notifiVm)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var notifi = _ManageStoreService.getNotifiById(notifiVm.NotificationID);
                    notifi.Status = notifiVm.Status;

                    _ManageStoreService.UpdateNotifi(notifi);
                    _ManageStoreService.Save();

                    var responseData = Mapper.Map<Notifications, NotificationsViewModel>(notifi);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }

        [Route("updateImgStore")]
        [HttpPut]
        public HttpResponseMessage UpdateImgStore(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ManageStoreViewModel ManageStoreVm = new ManageStoreViewModel();
                if (httpRequest.Form["ManageStoreID"] != null && httpRequest.Form["ManageStoreID"] != "null" && httpRequest.Form["ManageStoreID"] != "")
                    ManageStoreVm.ManageStoreID = Guid.Parse(httpRequest.Form["ManageStoreID"]);
                if (httpRequest.Form["Address"] != null)
                    ManageStoreVm.Address = httpRequest.Form["Address"];
                if (httpRequest.Form["CreateDate"] != null)
                    ManageStoreVm.CreateDate = DateTime.Parse(httpRequest.Form["CreateDate"]);
                if (httpRequest.Form["Expirydate"] != null)
                    ManageStoreVm.Expirydate = DateTime.Parse(httpRequest.Form["Expirydate"]);
                if (httpRequest.Form["StoreName"] != null)
                    ManageStoreVm.StoreName = httpRequest.Form["StoreName"];
                if (httpRequest.Form["Business"] != null)
                    ManageStoreVm.Business = httpRequest.Form["Business"];
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    string filePath = "";
                    var extension = "";
                    string store = "";
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        if (postedFile != null && postedFile.ContentLength > 0)
                        {

                            int MaxContentLength = 1024 * 1024 * 5; //Size = 5 MB  

                            IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".jpeg" };
                            var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                            extension = ext.ToLower();
                            if (!AllowedFileExtensions.Contains(extension))
                            {
                                var message = string.Format("Please Upload image of type .jpg,.gif,.png,.jepg");
                                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
                            }
                            else if (postedFile.ContentLength > MaxContentLength)
                            {

                                var message = string.Format("Please Upload a file upto 5 mb.");
                                return request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
                            }
                            else
                            {
                                var img = ResizeImage.Resize(Image.FromStream(postedFile.InputStream, true, true), 250);
                                store = ManageStoreVm.StoreName;
                                // Specify the directory you want to manipulate.
                                string path = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\UploadedFiles\images\" + store + @"\item";
                                // Determine whether the directory exists.
                                if (!Directory.Exists(path))
                                {
                                    // Try to create the directory.
                                    DirectoryInfo di = Directory.CreateDirectory(path);
                                }

                                filePath = path + @"\" + ManageStoreVm.ManageStoreID + extension;

                                if (File.Exists(filePath))
                                {
                                    File.Delete(filePath);
                                }

                                img.Save(filePath);
                            }
                        }
                    }

                    var dbUser = _ManageStoreService.GetStore(ManageStoreVm.StoreName);
                    dbUser.UpdateManageStore(ManageStoreVm);
                    dbUser.Logo = "/UploadedFiles/images/" + store + "/item/" + ManageStoreVm.ManageStoreID + extension;
                    _ManageStoreService.Update(dbUser);
                    _ManageStoreService.Save();
                    var responseData = Mapper.Map<ManageStore, ManageStoreViewModel>(dbUser);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

    }
}