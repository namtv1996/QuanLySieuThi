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
    [Authorize]
    [RoutePrefix("api/applicationUser")]
    public class ApplicationUserController : ApiControllerBase
    {
        private ApplicationUserManager _userManager;
        private IApplicationGroupService _appGroupService;
        private IApplicationRoleService _appRoleService;
        private IApplicationUserService _appUserService;

        public ApplicationUserController(
            IApplicationGroupService appGroupService,
            IApplicationRoleService appRoleService,
            ApplicationUserManager userManager,
            IApplicationUserService appUserService,
            IErrorService errorService)
            : base(errorService)
        {
            _appRoleService = appRoleService;
            _appGroupService = appGroupService;
            _userManager = userManager;
            _appUserService = appUserService;
        }

        [Route("getlistpaging")]
        [HttpGet]
        [Authorize(Roles = "User_View")]
        public HttpResponseMessage GetListPaging(HttpRequestMessage request, int page, int pageSize, string filter = null)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                int totalRow = 0;
                var model = _appUserService.GetAll(User.Identity.Name);
                IEnumerable<ApplicationUserViewModel> modelVm = Mapper.Map<IEnumerable<ApplicationUser>, IEnumerable<ApplicationUserViewModel>>(model);

                PaginationSet<ApplicationUserViewModel> pagedSet = new PaginationSet<ApplicationUserViewModel>()
                {
                    Page = page,
                    TotalCount = totalRow,
                    TotalPages = (int)Math.Ceiling((decimal)totalRow / pageSize),
                    Items = modelVm
                };

                response = request.CreateResponse(HttpStatusCode.OK, pagedSet);

                return response;
            });
        }

        [Route("detail/{id}")]
        [HttpGet]
        [Authorize(Roles = "User_View")]
        public HttpResponseMessage Details(HttpRequestMessage request, string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return request.CreateErrorResponse(HttpStatusCode.BadRequest, nameof(id) + " không có giá trị.");
            }
            var user = _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return request.CreateErrorResponse(HttpStatusCode.NoContent, "Không có dữ liệu");
            }
            else
            {
                var applicationUserViewModel = Mapper.Map<ApplicationUser, ApplicationUserViewModel>(user.Result);
                var listGroup = _appGroupService.GetListGroupByUserId(applicationUserViewModel.Id);
                applicationUserViewModel.Groups = Mapper.Map<IEnumerable<ApplicationGroup>, IEnumerable<ApplicationGroupViewModel>>(listGroup);
                return request.CreateResponse(HttpStatusCode.OK, applicationUserViewModel);
            }
        }

        [HttpPost]
        [Route("add")]
        [Authorize(Roles = "User_Add")]
        public async Task<HttpResponseMessage> Create(HttpRequestMessage request, ApplicationUserViewModel applicationUserViewModel)
        {
            if (ModelState.IsValid)
            {
                var newAppUser = new ApplicationUser();
                newAppUser.UpdateUser(applicationUserViewModel);
                try
                {
                    newAppUser.Id = Guid.NewGuid().ToString();
                    newAppUser.ManageStoreID = _appUserService.GetStoreID(User.Identity.Name);
                    newAppUser.StoreName = _appUserService.GetStoreName(User.Identity.Name);
                    var result = await _userManager.CreateAsync(newAppUser, applicationUserViewModel.Password);
                    if (result.Succeeded)
                    {
                        var listAppUserGroup = new List<ApplicationUserGroup>();
                        foreach (var group in applicationUserViewModel.Groups)
                        {
                            listAppUserGroup.Add(new ApplicationUserGroup()
                            {
                                GroupId = group.ID,
                                UserId = newAppUser.Id
                            });
                            //add role to user
                            var listRole = _appRoleService.GetListRoleByGroupId(group.ID);
                            foreach (var role in listRole)
                            {
                                await _userManager.RemoveFromRoleAsync(newAppUser.Id, role.Name);
                                await _userManager.AddToRoleAsync(newAppUser.Id, role.Name);
                            }
                        }
                        _appGroupService.AddUserToGroups(listAppUserGroup, newAppUser.Id);
                        _appGroupService.Save();

                        return request.CreateResponse(HttpStatusCode.OK, applicationUserViewModel);
                    }
                    else
                        return request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Join(",", result.Errors));
                }
                catch (NameDuplicatedException dex)
                {
                    return request.CreateErrorResponse(HttpStatusCode.BadRequest, dex.Message);
                }
                catch (Exception ex)
                {
                    return request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
                }
            }
            else
            {
                return request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [Route("updateImgUser")]
        [HttpPut]
        public HttpResponseMessage UpdateImgUser(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ApplicationUserViewModel ApplicationUserVm = new ApplicationUserViewModel();
                if (httpRequest.Form["Id"] != null && httpRequest.Form["Id"] != "null" && httpRequest.Form["Id"] != "")
                    ApplicationUserVm.Id = httpRequest.Form["Id"];
                if (httpRequest.Form["FullName"] != null)
                    ApplicationUserVm.FullName = httpRequest.Form["FullName"];
                if (httpRequest.Form["BirthDay"] != null)
                    ApplicationUserVm.BirthDay = DateTime.Parse(httpRequest.Form["BirthDay"]);
                if (httpRequest.Form["Email"] != null)
                    ApplicationUserVm.Email = httpRequest.Form["Email"];
                if (httpRequest.Form["Password"] != null)
                    ApplicationUserVm.Password = httpRequest.Form["Password"];
                if (httpRequest.Form["UserName"] != null)
                    ApplicationUserVm.UserName = httpRequest.Form["UserName"];
                if (httpRequest.Form["Address"] != null)
                    ApplicationUserVm.Address = httpRequest.Form["Address"];
                if (httpRequest.Form["StoreName"] != null)
                    ApplicationUserVm.StoreName = httpRequest.Form["StoreName"];
                if (httpRequest.Form["PhoneNumber"] != null)
                    ApplicationUserVm.PhoneNumber = httpRequest.Form["PhoneNumber"];
                if (httpRequest.Form["BranchID"] != null)
                    ApplicationUserVm.BranchID = Guid.Parse(httpRequest.Form["BranchID"]);
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
                                store = _appUserService.GetStoreName(User.Identity.Name);

                                // Specify the directory you want to manipulate.
                                string path = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\UploadedFiles\images\" + store + @"\item";
                                // Determine whether the directory exists.
                                if (!Directory.Exists(path))
                                {
                                    // Try to create the directory.
                                    DirectoryInfo di = Directory.CreateDirectory(path);
                                }

                                filePath = path + @"\" + ApplicationUserVm.Id + extension;

                                if (File.Exists(filePath))
                                {
                                    File.Delete(filePath);
                                }

                                img.Save(filePath);
                            }
                        }
                    }

                    var dbUser = _appUserService.GetByName(ApplicationUserVm.UserName);
                    dbUser.UpdateUser(ApplicationUserVm);
                    dbUser.Avatar = "/UploadedFiles/images/" + store + "/item/" + ApplicationUserVm.Id + extension;
                    _appUserService.Update(dbUser);
                  _appUserService.Save();
                    var responseData = Mapper.Map<ApplicationUser, ApplicationUserViewModel>(dbUser);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }


        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "User_Update")]
        public async Task<HttpResponseMessage> Update(HttpRequestMessage request, ApplicationUserViewModel applicationUserViewModel)
        {
            if (ModelState.IsValid)
            {
                var appUser = await _userManager.FindByIdAsync(applicationUserViewModel.Id);
                try
                {
                    appUser.UpdateUser(applicationUserViewModel);
                    var result = await _userManager.UpdateAsync(appUser);
                    if (result.Succeeded)
                    {
                        var listAppUserGroup = new List<ApplicationUserGroup>();
                        foreach (var group in applicationUserViewModel.Groups)
                        {
                            listAppUserGroup.Add(new ApplicationUserGroup()
                            {
                                GroupId = group.ID,
                                UserId = applicationUserViewModel.Id
                            });
                            //add role to user
                            var listRole = _appRoleService.GetListRoleByGroupId(group.ID);
                            foreach (var role in listRole)
                            {
                                await _userManager.RemoveFromRoleAsync(appUser.Id, role.Name);
                                await _userManager.AddToRoleAsync(appUser.Id, role.Name);
                            }
                        }
                        _appGroupService.AddUserToGroups(listAppUserGroup, applicationUserViewModel.Id);
                        _appGroupService.Save();
                        return request.CreateResponse(HttpStatusCode.OK, applicationUserViewModel);
                    }
                    else
                        return request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Join(",", result.Errors));
                }
                catch (NameDuplicatedException dex)
                {
                    return request.CreateErrorResponse(HttpStatusCode.BadRequest, dex.Message);
                }
            }
            else
            {
                return request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpDelete]
        [Route("delete")]
        [Authorize(Roles = "User_Delete")]
        public async Task<HttpResponseMessage> Delete(HttpRequestMessage request, string id)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            var result = await _userManager.DeleteAsync(appUser);
            if (result.Succeeded)
                return request.CreateResponse(HttpStatusCode.OK, id);
            else
                return request.CreateErrorResponse(HttpStatusCode.OK, string.Join(",", result.Errors));
        }
    }
}