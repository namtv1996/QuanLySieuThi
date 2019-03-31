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
    [RoutePrefix("api/pricePolicy")]

    public class PricePolicyController : ApiControllerBase
    {
        private IPricePolicyService _pricePolicyService;

        public PricePolicyController(IErrorService errorService, IPricePolicyService pricePolicyService) : base(errorService)
        {
            this._pricePolicyService = pricePolicyService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPricePolicy = _pricePolicyService.GetAll();

                var listPricePolicyVm = Mapper.Map<List<PricePolicyViewModel>>(listPricePolicy);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPricePolicyVm);

                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var pp = _pricePolicyService.GetByID(id);

                var ppvm = Mapper.Map<PricePolicyViewModel>(pp);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ppvm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Create(HttpRequestMessage request, PricePolicyViewModel ppvm)
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
                    PricePolicy pp = new PricePolicy();
                    pp.UpdatePricePolicy(ppvm);
                    pp.PricePolicyID = Guid.NewGuid();
                    pp.CreateDate = DateTime.Now;
                    pp.CreateBy = User.Identity.Name;
                    pp.Status = true;
                   

                    try
                    {
                        _pricePolicyService.Add(pp);
                        _pricePolicyService.SaveChanges();

                        var responseData = Mapper.Map<PricePolicy, PricePolicyViewModel>(pp);
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
        public HttpResponseMessage Update(HttpRequestMessage request, PricePolicyViewModel ppvm)
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
                    var pp = _pricePolicyService.GetByID(ppvm.PricePolicyID);

                    pp.UpdatePricePolicy(ppvm);
                    pp.ModifyDate = DateTime.Now;
                    pp.ModifyBy = User.Identity.Name;

                    _pricePolicyService.Update(pp);
                    _pricePolicyService.SaveChanges();

                    var responseData = Mapper.Map<PricePolicy, PricePolicyViewModel>(pp);
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
                    _pricePolicyService.Delete(id);
                    _pricePolicyService.SaveChanges();

                    var responseData = Mapper.Map<PricePolicy, PricePolicyViewModel>(_pricePolicyService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
