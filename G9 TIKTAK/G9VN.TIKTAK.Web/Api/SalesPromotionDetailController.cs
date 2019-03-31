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
    [RoutePrefix("api/salespromotiondetail")]
    [Authorize]
    public class SalesPromotionDetailController:ApiControllerBase
    {
         private ISalesPromotionDetailService _salesPromotionDetailService;
          public SalesPromotionDetailController(IErrorService errorService, ISalesPromotionDetailService _salesPromotionDetailService): base(errorService)
          {
            this._salesPromotionDetailService = _salesPromotionDetailService;
          }
          [Route("getAll")]
          [HttpGet]
          public HttpResponseMessage getAll(HttpRequestMessage request)
          {
              return CreateHttpResponse(request, () =>
              {
                  var listSalesPromotionDetail = _salesPromotionDetailService.GetAll();
                  var listSalesPromotionDetailVM = Mapper.Map<List<SalesPromotionDetailViewModel>>(listSalesPromotionDetail);
                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listSalesPromotionDetailVM);
                  return response;
              });
          }
          [Route("create")]
          [HttpPost]
          public HttpResponseMessage Create(HttpRequestMessage request, SalesPromotionDetailViewModel SalesPromotionDetailVm)
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
                      SalesPromotionDetail SalesPromotionDetail = new SalesPromotionDetail();
                      SalesPromotionDetail.UpdateSalesPromotionDetail(SalesPromotionDetailVm);
                      SalesPromotionDetail.VoucherDetailID = Guid.NewGuid();
                      try
                      {
                          _salesPromotionDetailService.Add(SalesPromotionDetail);
                          _salesPromotionDetailService.SaveChanges();
                          var responseData = Mapper.Map<SalesPromotionDetail, SalesPromotionDetailViewModel>(SalesPromotionDetail);
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
                  var Salespromotion = _salesPromotionDetailService.GetByVoucherID(id);

                  var SalespromotionVm = Mapper.Map<List<SalesPromotionDetailViewModel>>(Salespromotion);

                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, SalespromotionVm);

                  return response;
              });
          }
     
    }
}