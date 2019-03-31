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
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/Customer")]
    [Authorize]
    public class CustomerController : ApiControllerBase
    {
        private IObjectService _objectService;

        public CustomerController(IErrorService errorService, IObjectService objectService)
            : base(errorService)
        {
            this._objectService = objectService;
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Customer_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCustomer = _objectService.GetByObjectKind(2);

                var listCustomerVm = Mapper.Map<List<ObjectViewModel>>(listCustomer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCustomerVm);

                return response;
            });
        }
        //báo cáo công nợ khách hàng
        [Route("getall1")]
        [HttpGet]
        [Authorize(Roles = "View_Report")]
        public HttpResponseMessage Get1(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCustomer = _objectService.GetByObjectKind(2);

                var listCustomerVm = Mapper.Map<List<ObjectViewModel>>(listCustomer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCustomerVm);

                return response;
            });
        }

        [Route("getCustomerByObjectCategory")]
        [HttpGet]
        public HttpResponseMessage GetCustomerByObjectCategory(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCustomer = _objectService.GetObjectByObjectCategory(2, id);

                var listCustomerVm = Mapper.Map<List<ObjectViewModel>>(listCustomer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCustomerVm);

                return response;
            });
        }

       
        [Route("search")]
        [HttpGet]
        public HttpResponseMessage Search(HttpRequestMessage request, string key)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCustomer = _objectService.GetByObjectKind(2, key);

                var listCustomerVm = Mapper.Map<List<ObjectViewModel>>(listCustomer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCustomerVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Customer_View")]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Customer = _objectService.GetByID(id);

                var CustomerVm = Mapper.Map<ObjectViewModel>(Customer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, CustomerVm);

                return response;
            });
        }

        [Route("getcustomerid")]
        [HttpGet]
        [Authorize(Roles = "Customer_View")]
        public HttpResponseMessage GetById(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Customer = _objectService.GetByID(id);

                var CustomerVm = Mapper.Map<ObjectViewModel>(Customer);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, CustomerVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Customer_Add")]
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
                    obj.ObjectKind = 2;
                    if(objectVm.BirthdayDate != null)
                    {
                        obj.BirthdayDate = DateTime.Parse(objectVm.BirthdayDate.ToString()).AddHours(7);
                    }
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
        [Authorize(Roles = "Customer_Update")]
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
                    var dbCustomer = _objectService.GetByID(ObjectVm.ObjectID);
                    dbCustomer.UpdateObject(ObjectVm);
                    if (ObjectVm.BirthdayDate != null)
                    {
                        dbCustomer.BirthdayDate = DateTime.Parse(ObjectVm.BirthdayDate.ToString()).AddHours(7);
                    }
                    dbCustomer.ModifyBy = User.Identity.Name;
                    dbCustomer.ModifyDate = DateTime.Now;

                    _objectService.Update(dbCustomer);
                    _objectService.SaveChanges();

                    var responseData = Mapper.Map<Object1, ObjectViewModel>(dbCustomer);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
        [Route("getCustomerCode")]
        [HttpGet]
        public HttpResponseMessage getSKU(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string sku = AutoCode.MaTuSinh("KH", _objectService.getCode("KH"));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, sku);
                return response;
            });
        }
        [Route("delete")]
        [HttpDelete]
        [Authorize(Roles = "Customer_Delete")]
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
