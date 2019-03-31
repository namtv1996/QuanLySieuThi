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
     [RoutePrefix("api/combo")]
    public class ComboController : ApiControllerBase
    {
          private IComboService _comboService;
          public ComboController(IErrorService errorService, IComboService comboService): base(errorService)
        {
            this._comboService = comboService;
        }
          [Route("getall")]
          [HttpGet]
          public HttpResponseMessage Get(HttpRequestMessage request)
          {
              return CreateHttpResponse(request, () =>
              {
                  var listItemTransfer = _comboService.GetAll();

                  var listItemTransferVm = Mapper.Map<List<ItemTransferViewModel>>(listItemTransfer);

                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listItemTransferVm);

                  return response;
              });
          }
          [Route("create")]
          [HttpPost]
          public HttpResponseMessage Create(HttpRequestMessage request, ComboViewModel coBoVm)
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
                      ComboDetail comBo = new ComboDetail();
                      comBo.UpdateComBo(coBoVm);
                      comBo.ID = Guid.NewGuid();
                     
                      try
                      {
                          _comboService.Add(comBo);
                          _comboService.SaveChanges();
                          var responseData = Mapper.Map<ComboDetail, ComboViewModel>(comBo);
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
                  var Combo = _comboService.GetByID(id);

                  var ListComBoVm = Mapper.Map<List<ComboViewModel>>(Combo);

                  HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, ListComBoVm);

                  return response;
              });
          }

    }
}