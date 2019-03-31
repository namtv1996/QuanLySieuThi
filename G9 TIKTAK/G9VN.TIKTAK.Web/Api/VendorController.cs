using AutoMapper;
using G9VN.TIKTAK.Common;
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
    [RoutePrefix("api/vendor")]
    [Authorize]
    public class VendorController : ApiControllerBase
    {
        private IObjectService _objectService;

        public VendorController(IErrorService errorService, IObjectService objectService) : base(errorService)
        {
            this._objectService = objectService;
        }

        [Route("getallobject")]
        [HttpGet]
        public HttpResponseMessage getallobject(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVendor = _objectService.GetAll();

                var listVendorVm = Mapper.Map<List<ObjectViewModel>>(listVendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVendorVm);

                return response;
            });
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Vendor_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVendor = _objectService.GetByObjectKind(1);

                var listVendorVm = Mapper.Map<List<ObjectViewModel>>(listVendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVendorVm);

                return response;
            });
        }
        //báo cáo công nợ phải trả cho nhà cung cấp
        [Route("getall1")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage Get1(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVendor = _objectService.GetByObjectKind(1);

                var listVendorVm = Mapper.Map<List<ObjectViewModel>>(listVendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVendorVm);

                return response;
            });
        }
        [Route("getVendorByObjectCategory")]
        [HttpGet]
        public HttpResponseMessage GetVendorByObjectCategory(HttpRequestMessage request,Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVendor = _objectService.GetObjectByObjectCategory(1,id);

                var listVendorVm = Mapper.Map<List<ObjectViewModel>>(listVendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVendorVm);

                return response;
            });
        }

        [Route("getVendorCode")]
        [HttpGet]
        public HttpResponseMessage getCode(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string code = AutoCode.MaTuSinh("NCC", _objectService.getCode("NCC"));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, code);
                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Vendor_View")]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Vendor = _objectService.GetByID(id);

                var VendorVm = Mapper.Map<ObjectViewModel>(Vendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, VendorVm);

                return response;
            });
        }

        [Route("getvendorid")]
        [HttpGet]
        [Authorize(Roles = "Vendor_View")]
        public HttpResponseMessage GetVendorById(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Vendor = _objectService.GetByID(id);

                var VendorVm = Mapper.Map<ObjectViewModel>(Vendor);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, VendorVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Vendor_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, ObjectViewModel objectVm)
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
                    Object1 obj = new Object1();
                    obj.UpdateObject(objectVm);
                    obj.ObjectID = Guid.NewGuid();
                    obj.ObjectKind = 1;
                    obj.Status = true;
                    obj.AccumulativePoint = 0;
                    obj.Debt = 0;
                    obj.CreateDate = DateTime.Now;
                    obj.CreateBy = User.Identity.Name;

                    try
                    {
                        _objectService.Add(obj);
                        _objectService.SaveChanges();

                        var responseData = Mapper.Map<Object1, ObjectViewModel>(obj);
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
        [Authorize(Roles = "Vendor_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, ObjectViewModel ObjectVm)
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
                    var dbVendor = _objectService.GetByID(ObjectVm.ObjectID);

                    dbVendor.UpdateObject(ObjectVm);
                    dbVendor.ModifyDate = DateTime.Now;
                    dbVendor.ModifyBy = User.Identity.Name;

                    _objectService.Update(dbVendor);
                    _objectService.SaveChanges();

                    var responseData = Mapper.Map<Object1, ObjectViewModel>(dbVendor);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
        [Authorize(Roles = "Vendor_Delete")]
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
                    _objectService.Delete(id);
                    _objectService.SaveChanges();

                    var responseData = Mapper.Map<Object1, ObjectViewModel>(_objectService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
