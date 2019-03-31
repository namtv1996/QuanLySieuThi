using G9VN.TIKTAK.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using G9VN.TIKTAK.Service;
using AutoMapper;
using G9VN.TIKTAK.Web.Models;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Web.Infrastructure.Extensions;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/branch")]
    [Authorize]
    public class branchController : ApiControllerBase
    {
        IBranchService _branchService;

        //tiem su phu thuoc thong qua constructor
        //thong qua DI autofac _branchService = new BranchService();
        public branchController(IErrorService errorService, IBranchService _branchService) : base(errorService)
        {
            this._branchService = _branchService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listBranch = _branchService.GetAll();
                var listBranchvm = Mapper.Map<List<BranchViewModel>>(listBranch);
                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listBranchvm);
                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Create(HttpRequestMessage request, BranchViewModel branchvm)
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
                    Branch newbranch = new Branch();
                    //goi phuong thuc mo rong cua Branch
                    newbranch.UpdateBranch(branchvm);
                    try
                    {
                        _branchService.Add(newbranch);
                        _branchService.SaveChanges();
                        //mapping
                        var responseData = Mapper.Map<Branch, BranchViewModel>(newbranch);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        //XOA 
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
                    _branchService.Delete(id);
                    _branchService.SaveChanges();

                    var responseData = Mapper.Map<Branch, BranchViewModel>(_branchService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }


        //lay branch theo id

        [Route("getbyid/{id:Guid}")]
        [HttpGet]
        public HttpResponseMessage GetById(HttpRequestMessage request, Guid id)
        {
            return CreateHttpResponse(request, () =>
            {
                var branch = _branchService.GetByID(id);

                var branhvm = Mapper.Map<BranchViewModel>(branch);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, branhvm);

                return response;
            });
        }
        
        //update branch
        [Route("update")]
        [HttpPut]
        public HttpResponseMessage update(HttpRequestMessage resquest,BranchViewModel branchvm)
        {
            return CreateHttpResponse(resquest, () => {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = resquest.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var bra = _branchService.GetByID(branchvm.BranchID);

                    //gan lai cac thuoc tinh , khong viet mo rong trong extensisions
                    bra.BranchID = branchvm.BranchID;
                    bra.BranchCode = branchvm.BranchCode;
                    bra.BranchName = branchvm.BranchName;
                    bra.Address = branchvm.Address;
                    bra.TelephoneNumber = branchvm.TelephoneNumber;
                    bra.Email = branchvm.Email;
                    bra.Status = branchvm.Status;
                    //goi phuong thuc update

                    _branchService.Update(bra);
                    _branchService.SaveChanges();
                    //map tu kieu Branch sang BranchViewModel
                    var responseData = Mapper.Map<Branch, BranchViewModel>(bra);
                    response = Request.CreateResponse(HttpStatusCode.Created, responseData);
                }
                return response;

            });

        }
    }
}
