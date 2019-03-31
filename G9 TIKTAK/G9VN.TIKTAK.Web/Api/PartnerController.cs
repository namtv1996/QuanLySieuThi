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
    [RoutePrefix("api/Partner")]
    [Authorize]
    public class PartnerController : ApiControllerBase
    {
        private IPartnerService _partnerService;
        public PartnerController(IErrorService errorService, IPartnerService partnerService): base(errorService)
        {
            this._partnerService = partnerService;
        }
        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, PartnerViewModel partnerVm)
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

                    Partner obj = new Partner();
                    obj.UpdatePartner(partnerVm);
                    obj.ID = Guid.NewGuid();
                    obj.Status = true;
                    try
                    {
                        _partnerService.Add(obj);
                        _partnerService.SaveChanges();

                        var responseData = Mapper.Map<Partner, PartnerViewModel>(obj);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPartner = _partnerService.GetAll();

                var listPartnerrVm = Mapper.Map<List<PartnerViewModel>>(listPartner);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPartnerrVm);

                return response;
            });
        }
        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, PartnerViewModel PartnerVm)
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
                    var dbItem = _partnerService.GetByID(PartnerVm.ID);

                    dbItem.UpdatePartner(PartnerVm);
                    _partnerService.Update(dbItem);
                    _partnerService.SaveChanges();

                    var responseData = Mapper.Map<Partner, PartnerViewModel>(dbItem);
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
                    _partnerService.Delete(id);
                    _partnerService.SaveChanges();

                    var responseData = Mapper.Map<Partner, PartnerViewModel>(_partnerService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }

    }
}