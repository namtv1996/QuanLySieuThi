using AutoMapper;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;
using G9VN.TIKTAK.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{

    [RoutePrefix("api/objectCategory")]
    [Authorize]
    public class ObjectCategoryController : ApiControllerBase
    {
        private IObjectCategoryService _objectCategoryService;
        private IObjectKindService _objectKindService;
        private IObjectService _objectService;

        public ObjectCategoryController(IErrorService errorService, IObjectCategoryService objectCategoryService, IObjectKindService objectKindService, IObjectService objectService) 
            : base(errorService)
        {
            this._objectCategoryService = objectCategoryService;
            this._objectKindService = objectKindService;
            this._objectService = objectService;
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Customer_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectCategory = _objectCategoryService.GetByObjectKind(2);

                var listObjectCategoryVm = Mapper.Map<List<ObjectCategoryViewModel>>(listObjectCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectCategoryVm);

                return response;
            });
        }
        [Route("getallV")]
        [HttpGet]
        [Authorize(Roles = "Vendor_View")]
        public HttpResponseMessage GetV(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectCategory = _objectCategoryService.GetByObjectKind(1);

                var listObjectCategoryVm = Mapper.Map<List<ObjectCategoryViewModel>>(listObjectCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectCategoryVm);

                return response;
            });
        }


        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request,Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var ObjectCategory = _objectCategoryService.GetByID(id);

                var ObjectCategoryVm = Mapper.Map<ObjectCategoryViewModel>(ObjectCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ObjectCategoryVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ObjectCategoryViewModel objCategoryVm)
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
                    ObjectCategory objCate = new ObjectCategory();
                    objCate.UpdateObjectCategory(objCategoryVm);
                    objCate.Id = Guid.NewGuid();
                    objCate.CreateDate = DateTime.Now;
                    objCate.CreateBy = User.Identity.Name;
                   
                    objCate.NumberObject = 0;
                   

                    try
                    {
                        _objectCategoryService.Add(objCate);
                        _objectCategoryService.SaveChanges();

                        var responseData = Mapper.Map<ObjectCategory, ObjectCategoryViewModel>(objCate);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, ObjectCategoryViewModel ObjCategoryVm)
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
                    var dbObjCategory = _objectCategoryService.GetByID(ObjCategoryVm.Id);

                    dbObjCategory.UpdateObjectCategory(ObjCategoryVm);
                    dbObjCategory.ModifyDate = DateTime.Now;
                    dbObjCategory.ModifyBy = User.Identity.Name;

                    _objectCategoryService.Update(dbObjCategory);
                    _objectCategoryService.SaveChanges();

                    var responseData = Mapper.Map<ObjectCategory, ObjectCategoryViewModel>(dbObjCategory);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
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
                    _objectCategoryService.Delete(id);
                    _objectCategoryService.SaveChanges();

                    var responseData = Mapper.Map<ObjectCategory, ObjectCategoryViewModel>(_objectCategoryService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("getAllObjectKind")]
        [HttpGet]     
        public HttpResponseMessage GetAllObjectKind(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectKind = _objectKindService.GetAll();

                var listObjectKindVm = Mapper.Map<List<ObjectKindViewModel>>(listObjectKind);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectKindVm);

                return response;
            });
        }

        [Route("getObjectByObjectKind")]
        [HttpGet]
        public HttpResponseMessage GetByObjectKind(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listObjectCategory = _objectService.GetByObjectKind(id);

                var listObjectCategoryVm = Mapper.Map<List<ObjectViewModel>>(listObjectCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listObjectCategoryVm);

                return response;
            });
        }
    }
}
