using AutoMapper;
using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Common.ViewsModel;
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
    [RoutePrefix("api/itemOption")]
    [Authorize]
    public class ItemOptionController : ApiControllerBase
    {
        private IItemOptionService _itemOptionService;
        private IApplicationUserService _appUserService;

        public ItemOptionController(IErrorService errorService, IItemOptionService itemOptionService, IApplicationUserService appUserService) : base(errorService)
        {
            this._itemOptionService = itemOptionService;
            this._appUserService = appUserService;
        }

        public string ConvertNumber(string str)
        {
            string monney = "";
            for (var i = 0; i < str.Length; i++)
            {
                if (str[i] != ',')
                {
                    monney = monney + str[i];
                }
            }
            return monney.ToString();
        }

        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<ItemOption> itemoption)
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
                    foreach (var data in itemoption)
                    {
                        data.ID = Guid.NewGuid();
                        data.CreateDate = DateTime.Now;
                        data.CreateBy = User.Identity.Name;
                        _itemOptionService.SaveChanges();
                        _itemOptionService.Add(data);
                        _itemOptionService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<ItemOptionViewModel>>(itemoption);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _itemOptionService.GetAll();

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }

        // ds tuy chon theo chi nhanh
        [Route("getListItemOptionByBranchID")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage GetListItemOptionByBranchID(HttpRequestMessage request, Guid BranchID)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _itemOptionService.GetListItemOptionByBranchID(BranchID);

                var listItemOptionVm = Mapper.Map<List<ItemOptionByBranchIDViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }

        [Route("getbyitemid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Item_View")]
        public HttpResponseMessage Get(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _itemOptionService.GetByItemID(id);

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

                return response;
            });
        }

        [Route("search")]
        [HttpGet]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemOption = _itemOptionService.GetAll(key);

                var listItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(listItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemOptionVm);

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
                var ItemOption = _itemOptionService.GetByID(id);

                var ItemOptionVm = Mapper.Map<ItemOptionViewModel>(ItemOption);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemOptionVm);

                return response;
            });
        }

        [Route("getbyitemcategoryid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByItemCategoryID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var ItemOption = _itemOptionService.GetByItemCategoryID(id);

                var ItemOptionVm = Mapper.Map<List<ItemOptionViewModel>>(ItemOption);

                response = request.CreateResponse(HttpStatusCode.OK, ItemOptionVm);
                return response;
            });
        }

        [Route("getitemsaleinvoice/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage getitemsaleinvoice(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                var ItemOptionList = _itemOptionService.GetItem_SaleInvoice(id);
                var ItemOptionListVm = Mapper.Map<List<ItemOptionViewModel>>(ItemOptionList);
                response = request.CreateResponse(HttpStatusCode.OK, ItemOptionListVm);
                return response;
            });
        }

        [Route("getitemsaleinvoice1/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "SaleOrder_View")]
        public HttpResponseMessage getitemsaleinvoice1(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var cartItem = _itemOptionService.GetItem_SaleInvoice1(id);
                var cartItemVm = Mapper.Map<List<CartViewModel>>(cartItem);
                response = request.CreateResponse(HttpStatusCode.OK, cartItemVm);
                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, ItemOptionViewModel ItemOptionVm)
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
                    ItemOption newItemOption = new ItemOption();
                    newItemOption.UpdateItemOption(ItemOptionVm);
                    newItemOption.CreateBy = User.Identity.Name;
                    if (ItemOptionVm.SKU == null || ItemOptionVm.SKU == "")
                    {
                        newItemOption.SKU = AutoCode.MaTuSinh("HH", _itemOptionService.getCode());
                    }
                    newItemOption.ID = Guid.NewGuid();
                    newItemOption.CreateDate = DateTime.Now;
                    try
                    {
                        _itemOptionService.Add(newItemOption);
                        _itemOptionService.SaveChanges();

                        var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(newItemOption);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch (Exception)
                    {
                    }
                }
                return response;
            });
        }

        [Route("CreateImg")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage CreateImg(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ItemOptionViewModel itemOptionVm = new ItemOptionViewModel();
                itemOptionVm.ID = Guid.NewGuid();
                if (httpRequest.Form["ClosingQuantity"] != null)
                    itemOptionVm.ClosingQuantity = int.Parse(ConvertNumber(httpRequest.Form["ClosingQuantity"]));
                if (httpRequest.Form["HomeFlag"] != null)
                    itemOptionVm.HomeFlag = bool.Parse(httpRequest.Form["HomeFlag"]);
                if (httpRequest.Form["ItemID"] != null && httpRequest.Form["ItemID"] != "null" && httpRequest.Form["ItemID"] != "")
                    itemOptionVm.ItemID = Guid.Parse(httpRequest.Form["ItemID"]);
                if (httpRequest.Form["MaximumInventory"] != null)
                    itemOptionVm.MaximumInventory = decimal.Parse(ConvertNumber(httpRequest.Form["MaximumInventory"]));
                if (httpRequest.Form["MinimumInventory"] != null)
                    itemOptionVm.MinimumInventory = decimal.Parse(ConvertNumber(httpRequest.Form["MinimumInventory"]));
                if (httpRequest.Form["Name"] != null)
                    itemOptionVm.Name = httpRequest.Form["Name"];
                if (httpRequest.Form["NotificationInventory"] != null)
                    itemOptionVm.NotificationInventory = bool.Parse(httpRequest.Form["NotificationInventory"]);
                if (httpRequest.Form["PurchasePrice"] != null)
                    itemOptionVm.PurchasePrice = decimal.Parse(ConvertNumber(httpRequest.Form["PurchasePrice"]));
                if (httpRequest.Form["SKU"] != null)
                    itemOptionVm.SKU = httpRequest.Form["SKU"];
                if (httpRequest.Form["Barcode"] != null)
                    itemOptionVm.Barcode = httpRequest.Form["Barcode"];
                if (httpRequest.Form["SalePrice"] != null)
                    itemOptionVm.SalePrice = decimal.Parse(ConvertNumber(httpRequest.Form["SalePrice"]));
                if (httpRequest.Form["Status"] != null)
                    itemOptionVm.Status = bool.Parse(httpRequest.Form["Status"]);
                if (httpRequest.Form["UnitConvertRate"] != null)
                    itemOptionVm.UnitConvertRate = httpRequest.Form["UnitConvertRate"];
                if (httpRequest.Form["UnitName"] != null)
                    itemOptionVm.UnitName = httpRequest.Form["UnitName"];
                if (httpRequest.Form["Weigh"] != null)
                    itemOptionVm.Weigh = httpRequest.Form["Weigh"];
                if (httpRequest.Form["WholesalePrice"] != null)
                    itemOptionVm.WholesalePrice = decimal.Parse(ConvertNumber(httpRequest.Form["WholesalePrice"]));

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
                                //string path = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\UploadedFiles\images\" + store + @"\itemoption";
                                string path = @"E:\DEVELOP\TEST\EDU\QuanLySieuThi\G9 TIKTAK\G9VN.TIKTAK.Web\UploadedFiles\images";

                                // Determine whether the directory exists.
                                if (!Directory.Exists(path))
                                {
                                    // Try to create the directory.
                                    DirectoryInfo di = Directory.CreateDirectory(path);
                                }

                                filePath = path + @"\" + itemOptionVm.ID + extension;
                                if (File.Exists(filePath))
                                {
                                    File.Delete(filePath);
                                }
                                img.Save(filePath);
                            }
                        }
                    }

                    ItemOption newItemOption = new ItemOption();
                    newItemOption.UpdateItemOption(itemOptionVm);
                    newItemOption.CreateBy = User.Identity.Name;
                    newItemOption.CreateDate = DateTime.Now;
                    if (itemOptionVm.SKU == null)
                    {
                        newItemOption.SKU = AutoCode.MaTuSinh("HH", _itemOptionService.getCode());
                    }
                    newItemOption.CreateDate = DateTime.Now;
                    if (extension == "")
                    {
                        newItemOption.Image1 = "../../../Assets/admin/img/imgpsh_fullsize (3).png";
                    }
                    else
                    {
                        //newItemOption.Image1 = "/UploadedFiles/images/" + store + "/itemoption/" + itemOptionVm.ID + extension;
                        newItemOption.Image1 = "../../../UploadedFiles/images/" + itemOptionVm.ID + extension;
                    }
                    try
                    {
                        _itemOptionService.Add(newItemOption);
                        _itemOptionService.SaveChanges();

                        var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(newItemOption);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        // [HttpGet]
        // [Route("ExportXls")]
        // public async Task<HttpResponseMessage> ExportXls(HttpRequestMessage request, string filter = null)
        // {
        //string fileName = string.Concat("Product_" + DateTime.Now.ToString("yyyyMMddhhmmsss") + ".xlsx");
        //var folderReport = ConfigHelper.GetByKey("ReportFolder");
        //string filePath = HttpContext.Current.Server.MapPath(folderReport);
        //if (!Directory.Exists(filePath))
        // {
        //    Directory.CreateDirectory(filePath);
        //}
        //string fullPath = Path.Combine(filePath, fileName);
        //try
        //{
        //    var data = _itemOptionService.GetListProduct(filter);

        //    await ReportHelper.GenerateXls(data, fullPath);
        //    return request.CreateErrorResponse(HttpStatusCode.OK, Path.Combine(folderReport, fileName));
        // }
        //catch (Exception ex)
        // {
        //    return request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
        //}
        // return null;
        // }

        [Route("updateImg")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage UpdateImg(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var httpRequest = HttpContext.Current.Request;
                ItemOptionViewModel itemOptionVm = new ItemOptionViewModel();

                if (httpRequest.Form["ID"] != null && httpRequest.Form["ID"] != "null" && httpRequest.Form["ID"] != "")
                    itemOptionVm.ID = Guid.Parse(httpRequest.Form["ID"]);
                if (httpRequest.Form["ClosingQuantity"] != null)
                    itemOptionVm.ClosingQuantity = int.Parse(ConvertNumber(httpRequest.Form["ClosingQuantity"]));
                if (httpRequest.Form["HomeFlag"] != null)
                    itemOptionVm.HomeFlag = bool.Parse(httpRequest.Form["HomeFlag"]);
                if (httpRequest.Form["ItemID"] != null && httpRequest.Form["ItemID"] != "null" && httpRequest.Form["ItemID"] != "")
                    itemOptionVm.ItemID = Guid.Parse(httpRequest.Form["ItemID"]);
                if (httpRequest.Form["MaximumInventory"] != null)
                    itemOptionVm.MaximumInventory = decimal.Parse(ConvertNumber(httpRequest.Form["MaximumInventory"]));
                if (httpRequest.Form["MinimumInventory"] != null)
                    itemOptionVm.MinimumInventory = decimal.Parse(ConvertNumber(httpRequest.Form["MinimumInventory"]));
                if (httpRequest.Form["Name"] != null)
                    itemOptionVm.Name = httpRequest.Form["Name"];
                if (httpRequest.Form["NotificationInventory"] != null)
                    itemOptionVm.NotificationInventory = bool.Parse(httpRequest.Form["NotificationInventory"]);
                if (httpRequest.Form["PurchasePrice"] != null)
                    itemOptionVm.PurchasePrice = decimal.Parse(ConvertNumber(httpRequest.Form["PurchasePrice"]));
                if (httpRequest.Form["SKU"] != null)
                    itemOptionVm.SKU = httpRequest.Form["SKU"];
                if (httpRequest.Form["Barcode"] != null && httpRequest.Form["Barcode"] != "null")
                    itemOptionVm.Barcode = httpRequest.Form["Barcode"];
                if (httpRequest.Form["SalePrice"] != null)
                    itemOptionVm.SalePrice = decimal.Parse(ConvertNumber(httpRequest.Form["SalePrice"]));
                if (httpRequest.Form["Status"] != null)
                    itemOptionVm.Status = bool.Parse(httpRequest.Form["Status"]);
                if (httpRequest.Form["UnitConvertRate"] != null)
                    itemOptionVm.UnitConvertRate = httpRequest.Form["UnitConvertRate"];
                if (httpRequest.Form["UnitName"] != null && httpRequest.Form["UnitName"] != "null")
                    itemOptionVm.UnitName = httpRequest.Form["UnitName"];
                if (httpRequest.Form["Weigh"] != null)
                    itemOptionVm.Weigh = httpRequest.Form["Weigh"];
                if (httpRequest.Form["WholesalePrice"] != null)
                    itemOptionVm.WholesalePrice = decimal.Parse(ConvertNumber(httpRequest.Form["WholesalePrice"]));

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
                                //string path = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\UploadedFiles\images\" + store + @"\itemoption";
                                string path = @"E:\DEVELOP\TEST\EDU\QuanLySieuThi\G9 TIKTAK\G9VN.TIKTAK.Web\UploadedFiles\images";

                                // Determine whether the directory exists.
                                if (!Directory.Exists(path))
                                {
                                    // Try to create the directory.
                                    DirectoryInfo di = Directory.CreateDirectory(path);
                                }

                                filePath = path + @"\" + itemOptionVm.ID + extension;
                                img.Save(filePath);
                            }
                        }
                    }

                    var dbItemOption = _itemOptionService.GetByID(itemOptionVm.ID);
                    if (dbItemOption.Image1 == null)
                    {
                        dbItemOption.UpdateItemOption(itemOptionVm);
                        dbItemOption.ModifiedDate = DateTime.Now;
                        dbItemOption.ModifiedBy = User.Identity.Name;
                        dbItemOption.Image1 = "../../../UploadedFiles/images/" + itemOptionVm.ID + extension;
                    }
                    else
                    {
                        if (extension == "")
                        {
                            itemOptionVm.Image1 = dbItemOption.Image1;
                            dbItemOption.UpdateItemOption(itemOptionVm);
                            dbItemOption.ModifiedDate = DateTime.Now;
                            dbItemOption.ModifiedBy = User.Identity.Name;
                        }
                        else
                        {
                            dbItemOption.UpdateItemOption(itemOptionVm);
                            dbItemOption.ModifiedDate = DateTime.Now;
                            dbItemOption.ModifiedBy = User.Identity.Name;
                            dbItemOption.Image1 = "../../../UploadedFiles/images/" + itemOptionVm.ID + extension;
                        }
                    }

                    _itemOptionService.Update(dbItemOption);
                    _itemOptionService.SaveChanges();

                    var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(dbItemOption);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, ItemOptionViewModel ItemOptionVm)
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
                    var dbItemOption = _itemOptionService.GetByID(ItemOptionVm.ID);

                    dbItemOption.UpdateItemOption(ItemOptionVm);
                    dbItemOption.ModifiedDate = DateTime.Now;
                    dbItemOption.ModifiedBy = User.Identity.Name;
                    _itemOptionService.Update(dbItemOption);
                    _itemOptionService.SaveChanges();

                    var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(dbItemOption);
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
                    _itemOptionService.Delete(id);
                    _itemOptionService.SaveChanges();

                    var responseData = Mapper.Map<ItemOption, ItemOptionViewModel>(_itemOptionService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        ///lấy mã sku khi thêm mới hàng hóa
        [Route("getSKU")]
        [HttpGet]
        public HttpResponseMessage getSKU(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string sku = AutoCode.MaTuSinh("HH", _itemOptionService.getCode());
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, sku);
                return response;
            });
        }

        [Route("deleteItemOption")]
        [HttpGet]
        public HttpResponseMessage DeleteItemOption(HttpRequestMessage request, Guid id, Guid itemid)
        {
            return CreateHttpResponse(request, () =>
            {
                int delete_status = _itemOptionService.DeleteItemOption(id, itemid);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, delete_status);
                return response;
            });
        }

        [Route("AutoComplete")]
        [HttpGet]
        public HttpResponseMessage AutoComplete(HttpRequestMessage request, Guid BranchID)
        {
            return CreateHttpResponse(request, () =>
            {
                var ItemOptionVM = Mapper.Map<List<AutoCopleteProduct>>(_itemOptionService.AutoComplete(BranchID));

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemOptionVM);
                return response;
            });
        }
    }
}