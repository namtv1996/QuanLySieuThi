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
    [RoutePrefix("api/transporter")]
    [Authorize]
    public class TransporterController : ApiControllerBase
    {
        private IObjectService _objectService;

        public TransporterController(IErrorService errorService, IObjectService objectService)
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
                var listTransporter = _objectService.GetByObjectKind(5);

                var listTransporterVm = Mapper.Map<List<ObjectViewModel>>(listTransporter);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listTransporterVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var transporter = _objectService.GetByID(id);

                var transporterVm = Mapper.Map<ObjectViewModel>(transporter);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, transporterVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
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
                    obj.ObjectKind = 5;
                    obj.Status = true;                   
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

        [Route("getCode")]
        [HttpGet]
        public HttpResponseMessage getCode(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string code = AutoCode.MaTuSinh("DT", _objectService.getCode("DT"));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, code);
                return response;
            });
        }

        [Route("getCountVoucherAndTotalAmount")]
        [HttpGet]
        public HttpResponseMessage getCountVoucherAndTotalAmount(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var transporter = _objectService.CountVoucherAndTotalAmountOfObject(id);

                var transporterVm = Mapper.Map<CountVoucherAndTotalAmount>(transporter);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, transporterVm);

                return response;
            });
        }

    }
}
