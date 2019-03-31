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
    [RoutePrefix("api/printedform")]
    [Authorize]
    public class PrintedFormController : ApiControllerBase
    {
        private IPrintedFormService _printedFormService;
        public PrintedFormController(IErrorService errorService, IPrintedFormService printedFormService) : base(errorService)
        {
            this._printedFormService = printedFormService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listCode = _printedFormService.GetAll();
                var listCodevm = Mapper.Map<List<PrintFormViewModel>>(listCode);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listCodevm);
                return response;
            });
        }
        [Route("getByID/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage getByID(HttpRequestMessage request,Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var Code = _printedFormService.GetByID(id);
                var Codevm = Mapper.Map<PrintFormViewModel>(Code);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, Codevm);
                return response;
            });
        }
        //update 
        [Route("update")]
        [HttpPut]
        public HttpResponseMessage update(HttpRequestMessage resquest, PrintFormViewModel formVM)
        {
            return CreateHttpResponse(resquest, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = resquest.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var form = _printedFormService.GetByID(formVM.ID);

                    //gan lai cac thuoc tinh , khong viet mo rong trong extensisions
                    form.HtmlHeader = formVM.HtmlHeader;
                    form.HtmlBody = formVM.HtmlBody;
                    //goi phuong thuc update

                    _printedFormService.Update(form);
                    _printedFormService.SaveChanges();
                    //map tu kieu Branch sang BranchViewModel
                    var responseData = Mapper.Map<PrintForm, PrintFormViewModel>(form);
                    response = Request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;

            });

        }
    }
}