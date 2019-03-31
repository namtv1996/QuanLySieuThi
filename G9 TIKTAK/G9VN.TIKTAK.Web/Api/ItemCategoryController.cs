using AutoMapper;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/itemCategory")]
    [Authorize]
    public class ItemCategoryController : ApiControllerBase
    {
        private IItemCategoryService _itemCategoryService;

        public ItemCategoryController(IErrorService errorService, IItemCategoryService itemCategoryService) : base(errorService)
        {
            this._itemCategoryService = itemCategoryService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItem = _itemCategoryService.GetAll();

                var listItemVm = Mapper.Map<List<ItemCategoryViewModel>>(listItem);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemVm);

                return response;
            });
        }
        [Route("SaveFile")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public HttpResponseMessage Save(HttpRequestMessage request, List<ItemCategory> item)
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
                      
                        data.Id = Guid.NewGuid();
                        data.Status = true;
                        _itemCategoryService.SaveChanges();
                        _itemCategoryService.Add(data);
                        _itemCategoryService.SaveChanges();
                    }
                    var responseData = Mapper.Map<List<ItemCategoryViewModel>>(item);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }
        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Item = _itemCategoryService.GetByID(id);

                var ItemVm = Mapper.Map<ItemCategoryViewModel>(Item);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ItemVm);

                return response;
            });
        }
        [Route("search")]
        [HttpGet]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listItemCategory = _itemCategoryService.GetAll(key);

                var listItemCategoryVm = Mapper.Map<List<ItemCategoryViewModel>>(listItemCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemCategoryVm);

                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Item_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, ItemCategoryViewModel ItemVm)
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
                    ItemCategory newItem = new ItemCategory();
                    newItem.UpdateItemCategory(ItemVm);
                    newItem.Id = Guid.NewGuid();
                   
                        _itemCategoryService.Add(newItem);
                        _itemCategoryService.SaveChanges();

                        var responseData = Mapper.Map<ItemCategory, ItemCategoryViewModel>(newItem);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        [Authorize(Roles = "Item_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, ItemCategoryViewModel ItemVm)
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
                    var dbItem = _itemCategoryService.GetByID(ItemVm.Id);

                    dbItem.UpdateItemCategory(ItemVm);

                    _itemCategoryService.Update(dbItem);
                    _itemCategoryService.SaveChanges();

                    var responseData = Mapper.Map<ItemCategory, ItemCategoryViewModel>(dbItem);
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
                    _itemCategoryService.Delete(id);
                    _itemCategoryService.SaveChanges();

                    var responseData = Mapper.Map<ItemCategory, ItemCategoryViewModel>(_itemCategoryService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
