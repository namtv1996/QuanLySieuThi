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
    [RoutePrefix("api/voucherCheck")]
    [Authorize]
    public class VoucherCheckController : ApiControllerBase
    {
        private IVoucherCheckService _voucherCheckService;

        public VoucherCheckController(IErrorService errorService, IVoucherCheckService voucherCheckService) : base(errorService)
        {
            this._voucherCheckService = voucherCheckService;
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Adjustment_View")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVoucherCheck = _voucherCheckService.GetByVoucherType(3).OrderByDescending(x=>x.CreateDate);

                var listVoucherCheckVm = Mapper.Map<List<VoucherCheckViewModel>>(listVoucherCheck);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVoucherCheckVm);

                return response;
            });
        }

        [Route("getbystatus")]
        [HttpGet]
        [Authorize(Roles = "Adjustment_View")]
        public HttpResponseMessage GetByStatus(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVoucherCheck = _voucherCheckService.GetByStatus(false);

                var listVoucherCheckVm = Mapper.Map<List<VoucherCheckViewModel>>(listVoucherCheck);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVoucherCheckVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Adjustment_View")]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var voucherCheck = _voucherCheckService.GetByID(id);

                var voucherCheckVm = Mapper.Map<VoucherCheckViewModel>(voucherCheck);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, voucherCheckVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Adjustment_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, VoucherCheckViewModel voucherCheckVm)
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
                    VoucherCheck voucherCheck = new VoucherCheck();
                    voucherCheck.UpdateVoucherCheck(voucherCheckVm);
                    voucherCheck.CreateDate = DateTime.Now;
                    voucherCheck.EndUpdate = DateTime.Now;
                    voucherCheck.CreateBy = User.Identity.Name;
                    voucherCheck.VoucherID = Guid.NewGuid();
                    voucherCheck.VoucherType = 3;
                    try
                    {
                        _voucherCheckService.Add(voucherCheck);
                        _voucherCheckService.SaveChanges();

                        var responseData = Mapper.Map<VoucherCheck, VoucherCheckViewModel>(voucherCheck);
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
        [Authorize(Roles = "Adjustment_Update")]
        public HttpResponseMessage Update(HttpRequestMessage request, VoucherCheckViewModel vcvm)
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
                    var voucherCheck = _voucherCheckService.GetByID(vcvm.VoucherID);

                    voucherCheck.UpdateVoucherCheck(vcvm);
                    voucherCheck.ModifyDate = DateTime.Now;
                    voucherCheck.EndUpdate = DateTime.Now;
                    voucherCheck.ModifyBy = User.Identity.Name;

                    _voucherCheckService.Update(voucherCheck);
                    _voucherCheckService.SaveChanges();

                    var responseData = Mapper.Map<VoucherCheck, VoucherCheckViewModel>(voucherCheck);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
        [Authorize(Roles = "Adjustment_Delete")]
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
                    _voucherCheckService.Delete(id);
                    _voucherCheckService.SaveChanges();

                    var responseData = Mapper.Map<VoucherCheck, VoucherCheckViewModel>(_voucherCheckService.GetByID(id));
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
                string code = AutoCode.MaTuSinh("PK", _voucherCheckService.GetCode());
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, code);
                return response;
            });
        }
    }
}
