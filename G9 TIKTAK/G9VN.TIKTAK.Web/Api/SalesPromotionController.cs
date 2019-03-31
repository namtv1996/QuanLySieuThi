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
    [RoutePrefix("api/salespromotion")]
    [Authorize]
    public class SalesPromotionController:ApiControllerBase
    {
          private ISalesPromotionService _salesPromotionService;
          public SalesPromotionController(IErrorService errorService, ISalesPromotionService _salesPromotionService): base(errorService)
          {
            this._salesPromotionService = _salesPromotionService;
          }
        [Route("getall")]
        [HttpGet]
          public HttpResponseMessage getAll(HttpRequestMessage request)
          {
              return CreateHttpResponse(request, () =>
              {
                  var listSalesPromotion = _salesPromotionService.GetAll();
                  var listSalesPromotionVM = Mapper.Map<List<SalesPromotionViewModel>>(listSalesPromotion);
                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSalesPromotionVM);
                  return response;
              });
          }
        [Route("getCode")]
        [HttpGet]
        public HttpResponseMessage getSKU(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                string sku = AutoCode.MaTuSinh("KM", _salesPromotionService.getCode("KM"));
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, sku);
                return response;
            });
        }
        [Route("UpdateInventory")]
        [HttpPut]
        public HttpResponseMessage UpdateInventory(HttpRequestMessage request, Guid ID)
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

                    _salesPromotionService.UpdateInventory(ID);
                    _salesPromotionService.SaveChanges();

                }
                return response;
            });
        }
        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, SalesPromotionViewModel SalesPromotionVm)
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
                    SalesPromotion SalesPromotion = new SalesPromotion();
                    SalesPromotion.UpdateSalesPromotion(SalesPromotionVm);
                    SalesPromotion.VoucherID= Guid.NewGuid();
                    SalesPromotion.VoucherDate =DateTime.Now;
                    try
                    {
                        _salesPromotionService.Add(SalesPromotion);
                        _salesPromotionService.SaveChanges();
                        var responseData = Mapper.Map<SalesPromotion, SalesPromotionViewModel>(SalesPromotion);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch (Exception ex)
                    {
                        string a = ex.Message;
                        Console.WriteLine(ex.Message);

                    }
                }
                return response;
            });
        }

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetByID(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Salespromotion = _salesPromotionService.GetByID(id);
                var SalespromotionVm = Mapper.Map<SalesPromotionViewModel>(Salespromotion);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, SalespromotionVm);

                return response;
            });
        }
        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, SalesPromotionViewModel SalesPromotionVm)
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
                    var SalesPromotion = _salesPromotionService.GetByID(SalesPromotionVm.VoucherID);
                    SalesPromotion.UpdateSalesPromotion(SalesPromotionVm);
                    _salesPromotionService.Update(SalesPromotion);
                    _salesPromotionService.SaveChanges();
                    var responsedata = Mapper.Map<SalesPromotion, SalesPromotionViewModel>(SalesPromotion);
                    response = request.CreateResponse(HttpStatusCode.Created, responsedata);
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
                    _salesPromotionService.Delete(id);
                    _salesPromotionService.SaveChanges();
                    var responseData = Mapper.Map<SalesPromotion, SalesPromotionViewModel>(_salesPromotionService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}