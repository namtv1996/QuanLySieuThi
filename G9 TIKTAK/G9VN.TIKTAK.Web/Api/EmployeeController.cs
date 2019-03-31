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
    [RoutePrefix("api/employee")]
    [Authorize]
    public class EmpolyeeController : ApiControllerBase
    {
        private IObjectService _objectService;

        public EmpolyeeController(IErrorService errorService, IObjectService objectService)
            : base(errorService)
        {
            this._objectService = objectService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listEmployee = _objectService.GetByObjectKind(3);

                var listEmployeeVm = Mapper.Map<List<ObjectViewModel>>(listEmployee);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listEmployeeVm);

                return response;
            });
        }
        [Route("getallTransporter")]
        [HttpGet]
        public HttpResponseMessage GetTransporter(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listEmployee = _objectService.GetByObjectKind(5);

                var listEmployeeVm = Mapper.Map<List<ObjectViewModel>>(listEmployee);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listEmployeeVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var employee = _objectService.GetByID(id);

                var employeeVm = Mapper.Map<ObjectViewModel>(employee);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, employeeVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
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
                    obj.ObjectKind = 3;
                    obj.Status = true;
                    obj.CreateBy = User.Identity.Name;
                    obj.CreateDate = DateTime.Now;

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
                    var dbEmployee = _objectService.GetByID(ObjectVm.ObjectID);

                    dbEmployee.UpdateObject(ObjectVm);
                    dbEmployee.ModifyDate = DateTime.Now;
                    dbEmployee.ModifyBy = User.Identity.Name;

                    _objectService.Update(dbEmployee);
                    _objectService.SaveChanges();

                    var responseData = Mapper.Map<Object1, ObjectViewModel>(dbEmployee);
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
