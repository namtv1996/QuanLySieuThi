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
    [RoutePrefix("api/paymentSchedule")]
    [Authorize]
    public class PaymentScheduleController : ApiControllerBase
    {
        private IPaymentScheduleService _paymentScheduleService;

        public PaymentScheduleController(IErrorService errorService, IPaymentScheduleService paymentScheduleService) : base(errorService)
        {
            this._paymentScheduleService = paymentScheduleService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPaymentSchedule = _paymentScheduleService.GetAll();

                var listPaymentScheduleVm = Mapper.Map<List<PaymentScheduleViewModel>>(listPaymentSchedule);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPaymentScheduleVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var ps = _paymentScheduleService.GetByID(id);

                var psvm = Mapper.Map<PaymentScheduleViewModel>(ps);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, psvm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, PaymentScheduleViewModel psvm)
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
                    PaymentSchedule ps = new PaymentSchedule();
                    ps.UpdatePaymentSchedule(psvm);
                    ps.PaymentScheduleID = Guid.NewGuid();
                    ps.CreateDate = DateTime.Now;
                    ps.CreateBy = User.Identity.Name;
                    ps.Status = true;


                    try
                    {
                        _paymentScheduleService.Add(ps);
                        _paymentScheduleService.SaveChanges();

                        var responseData = Mapper.Map<PaymentSchedule, PaymentScheduleViewModel>(ps);
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
        public HttpResponseMessage Update(HttpRequestMessage request, PaymentScheduleViewModel psvm)
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
                    var ps = _paymentScheduleService.GetByID(psvm.PaymentScheduleID);

                    ps.UpdatePaymentSchedule(psvm);
                    ps.ModifyDate = DateTime.Now;
                    ps.ModifyBy = User.Identity.Name;

                    _paymentScheduleService.Update(ps);
                    _paymentScheduleService.SaveChanges();

                    var responseData = Mapper.Map<PaymentSchedule, PaymentScheduleViewModel>(ps);
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
                    _paymentScheduleService.Delete(id);
                    _paymentScheduleService.SaveChanges();

                    var responseData = Mapper.Map<PaymentSchedule, PaymentScheduleViewModel>(_paymentScheduleService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
