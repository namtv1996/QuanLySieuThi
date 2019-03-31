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
    [RoutePrefix("api/voucherCheckDetail")]
    [Authorize]
    public class VoucherCheckDetailController : ApiControllerBase
    {
        private IVoucherCheckDetailService _voucherCheckDetailService;

        public VoucherCheckDetailController(IErrorService errorService, IVoucherCheckDetailService voucherCheckDetailService) : base(errorService)
        {
            this._voucherCheckDetailService = voucherCheckDetailService;
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        [Authorize(Roles = "Adjustment_View")]
        public HttpResponseMessage Get(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var listVoucherCheckDetail = _voucherCheckDetailService.GetByVoucherID(id);

                var listVoucherCheckDetailVm = Mapper.Map<List<VoucherCheckDetailViewModel>>(listVoucherCheckDetail);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listVoucherCheckDetailVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [Authorize(Roles = "Adjustment_Add")]
        public HttpResponseMessage Create(HttpRequestMessage request, VoucherCheckDetailViewModel voucherCheckDetailVm)
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
                    VoucherCheckDetail voucherCheckDetail = new VoucherCheckDetail();
                    voucherCheckDetail.UpdateVoucherCheckDetail(voucherCheckDetailVm);
                    //voucherCheckDetail.InvDate = DateTime.Now;
                    voucherCheckDetail.VoucherCheckDetailID = Guid.NewGuid();
                    try
                    {
                        _voucherCheckDetailService.Add(voucherCheckDetail);
                        _voucherCheckDetailService.SaveChanges();

                        var responseData = Mapper.Map<VoucherCheckDetail, VoucherCheckDetailViewModel>(voucherCheckDetail);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
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
                    _voucherCheckDetailService.Delete(id);
                    _voucherCheckDetailService.SaveChanges();

                    var responseData = Mapper.Map<VoucherCheckDetail, VoucherCheckDetailViewModel>(_voucherCheckDetailService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
