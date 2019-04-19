using AutoMapper;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Common.Constant;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/item")]
    [Authorize]
    public class ItemController : ApiControllerBase
    {
        private IItemService _itemService;
        private IApplicationUserService _appUserService;

        public ItemController(IErrorService errorService, IItemService itemService, IApplicationUserService appUserService) : base(errorService)
        {
            this._itemService = itemService;
            this._appUserService = appUserService;
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItem = _itemService.GetAll();

                var listItemVm = Mapper.Map<List<ItemViewModel>>(listItem);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Item = _itemService.GetByID(id);

                var ItemVm = Mapper.Map<ItemViewModel>(Item);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemVm);

                return response;
            });
        }

        [Route("search")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItems = _itemService.GetAll(key);

                var listItemsVm = Mapper.Map<List<ItemViewModel>>(listItems);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemsVm);

                return response;
            });
        }

        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<Item> item)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    foreach (var data in item)
                    {
                        data.CreateDate = DateTime.Now;
                        data.CreateBy = User.Identity.Name;
                        data.ItemID = Guid.NewGuid();
                        _itemService.SaveChanges();
                        _itemService.Add(data);
                        _itemService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<ItemViewModel>>(item);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, ItemViewModel ItemVm)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    Item newItem = new Item();
                    newItem.UpdateItem(ItemVm);
                    newItem.CreateDate = DateTime.Now;
                    newItem.CreateBy = User.Identity.Name;
                    newItem.ItemID = Guid.NewGuid();
                    try
                    {
                        _itemService.Add(newItem);
                        _itemService.SaveChanges();

                        var responseData = Mapper.Map<Item, ItemViewModel>(newItem);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch (Exception ex)
                    {
                        string a = ex.Message;
                        Console.WriteLine(ex.Message);
                    }
                }
                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, ItemViewModel ItemVm)
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
                    var dbItem = _itemService.GetByID(ItemVm.ItemID);

                    dbItem.UpdateItem(ItemVm);
                    dbItem.ModifiedDate = DateTime.Now;
                    dbItem.ModifiedBy = User.Identity.Name;
                    _itemService.Update(dbItem);
                    _itemService.SaveChanges();

                    var responseData = Mapper.Map<Item, ItemViewModel>(dbItem);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("createImg")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage CreateImg(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ItemViewModel itemVm = new ItemViewModel();
                itemVm.ItemID = Guid.NewGuid();

                if (httpRequest.Form["Name"] != null)
                    itemVm.Name = httpRequest.Form["Name"];
                if (httpRequest.Form["Status"] != null)
                    itemVm.Status = bool.Parse(httpRequest.Form["Status"]);
                if (httpRequest.Form["Tags"] != null)
                    itemVm.Tags = httpRequest.Form["Tags"];
                if (httpRequest.Form["CreateBy"] != null)
                    itemVm.CreateBy = httpRequest.Form["CreateBy"];
                if (httpRequest.Form["CreateDate"] != null)
                    itemVm.CreateDate = DateTime.Parse(httpRequest.Form["CreateDate"]);
                if (httpRequest.Form["ModifiedBy"] != null)
                    itemVm.ModifiedBy = httpRequest.Form["ModifiedBy"];
                if (httpRequest.Form["ModifiedDate"] != null)
                    itemVm.ModifiedDate = DateTime.Parse(httpRequest.Form["ModifiedDate"]);
                if (httpRequest.Form["Brand"] != null)
                    itemVm.Brand = httpRequest.Form["Brand"];
                if (httpRequest.Form["ItemCategoryID"] != null && httpRequest.Form["ItemCategoryID"] != "null" && httpRequest.Form["ItemCategoryID"] != "")
                    itemVm.ItemCategoryID = Guid.Parse(httpRequest.Form["ItemCategoryID"]);
                if (httpRequest.Form["Quantity"] != null)
                    itemVm.Quantity = int.Parse(httpRequest.Form["Quantity"]);
                if (httpRequest.Form["Unit"] != null)
                    itemVm.Unit = httpRequest.Form["Unit"];

                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
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

                                filePath = path + @"\" + itemVm.ItemID + extension;

                                img.Save(filePath);
                            }
                        }
                    }

                    Item newItem = new Item();
                    newItem.UpdateItem(itemVm);
                    newItem.CreateDate = DateTime.Now;
                    newItem.CreateBy = User.Identity.Name;
                    if (extension == "")
                    {
                        newItem.Image = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                    else
                    {
                        newItem.Image = "/UploadedFiles/images/" + store + "/item/" + itemVm.ItemID + extension;
                    }
                    try
                    {
                        _itemService.Add(newItem);
                        _itemService.SaveChanges();

                        var responseData = Mapper.Map<Item, ItemViewModel>(newItem);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch (Exception ex)
                    {
                        string a = ex.Message;
                        Console.WriteLine(ex.Message);
                    }
                }
                return response;
            });
        }

        [Route("updateImg")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage UpdateImg(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ItemViewModel itemVm = new ItemViewModel();
                if (httpRequest.Form["ItemID"] != null && httpRequest.Form["ItemID"] != "null" && httpRequest.Form["ItemID"] != "")
                    itemVm.ItemID = Guid.Parse(httpRequest.Form["ItemID"]);
                if (httpRequest.Form["Name"] != null)
                    itemVm.Name = httpRequest.Form["Name"];
                if (httpRequest.Form["Status"] != null)
                    itemVm.Status = bool.Parse(httpRequest.Form["Status"]);
                if (httpRequest.Form["Tags"] != null)
                    itemVm.Tags = httpRequest.Form["Tags"];
                if (httpRequest.Form["CreateBy"] != null)
                    itemVm.CreateBy = httpRequest.Form["CreateBy"];
                if (httpRequest.Form["CreateDate"] != null)
                    itemVm.CreateDate = DateTime.Parse(httpRequest.Form["CreateDate"]);
                if (httpRequest.Form["ModifiedBy"] != null)
                    itemVm.ModifiedBy = httpRequest.Form["ModifiedBy"];
                //if (httpRequest.Form["ModifiedDate"] != null)
                //    itemVm.ModifiedDate = DateTime.Parse(httpRequest.Form["ModifiedDate"]);
                if (httpRequest.Form["Brand"] != null)
                    itemVm.Brand = httpRequest.Form["Brand"];
                if (httpRequest.Form["ItemCategoryID"] != null && httpRequest.Form["ItemCategoryID"] != "null" && httpRequest.Form["ItemCategoryID"] != "")
                    itemVm.ItemCategoryID = Guid.Parse(httpRequest.Form["ItemCategoryID"]);
                if (httpRequest.Form["Quantity"] != null)
                    itemVm.Quantity = int.Parse(httpRequest.Form["Quantity"]);
                if (httpRequest.Form["Unit"] != null)
                    itemVm.Unit = httpRequest.Form["Unit"];

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
                                //string path = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\UploadedFiles\images\" + store + @"\item";
                                string path = Constant.pathUploadFile;
                                // Determine whether the directory exists.
                                if (!Directory.Exists(path))
                                {
                                    // Try to create the directory.
                                    DirectoryInfo di = Directory.CreateDirectory(path);
                                }

                                filePath = path + @"\" + itemVm.ItemID + extension;

                                if (File.Exists(filePath))
                                {
                                    File.Delete(filePath);
                                }

                                img.Save(filePath);
                            }
                        }
                    }

                    var dbItem = _itemService.GetByID(itemVm.ItemID);
                    var IMG = dbItem.Image;
                    dbItem.UpdateItem(itemVm);
                    dbItem.ModifiedDate = DateTime.Now;
                    dbItem.ModifiedBy = User.Identity.Name;
                    if (extension == "" && IMG == "../../../Assets/admin/img/imgpsh_fullsize (3).png")
                    {
                        dbItem.Image = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                    if (extension != "")
                    {
                        //dbItem.Image = "../../../UploadedFiles/images/" + store + "/item/" + itemVm.ItemID + extension;

                        dbItem.Image = "../../../UploadedFiles/images/" + itemVm.ItemID + extension;
                    }
                    if (extension == "" && IMG != "../../../Assets/admin/img/imgpsh_fullsize (3).png")
                    {
                        dbItem.Image = IMG;
                    }
                    if (dbItem.Tags == "null")
                    {
                        dbItem.Tags = "";
                    }
                    if (dbItem.Brand == "null")
                    {
                        dbItem.Brand = "";
                    }
                    _itemService.Update(dbItem);
                    _itemService.SaveChanges();

                    var responseData = Mapper.Map<Item, ItemViewModel>(dbItem);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
        [Authorize(Roles = "Item_Delete")]
        public HttpResponseMessage Delete(HttpRequestMessage request, Guid id)
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
                    _itemService.Delete(id);
                    _itemService.SaveChanges();

                    var responseData = Mapper.Map<Item, ItemViewModel>(_itemService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}