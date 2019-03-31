using AutoMapper;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.SYSTEM.Models;
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
    [RoutePrefix("api/configStore")]
    public class ConfigurationStoreController : ApiControllerBase
    {
        private IConfigurationStoreService _configurationStoreService;
        public ConfigurationStoreController(IErrorService errorService, IConfigurationStoreService configurationStoreService) : base(errorService)
        {
            this._configurationStoreService = configurationStoreService;
        }

        [Route("getConfig")]
        [HttpGet]       
        public HttpResponseMessage GetConfigByStore(HttpRequestMessage request, Guid? manageStoreID)
        {
            return CreateHttpResponse(request, () =>
            {
                var config = _configurationStoreService.getConfigByStore(manageStoreID);

                var configVm = Mapper.Map<ConfigurationStoreViewModel>(config);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, configVm);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]      
        public HttpResponseMessage Create(HttpRequestMessage request, ConfigurationStoreViewModel cfgVm)
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

                    ConfigurationStore cfg = new ConfigurationStore();
                    cfg.UpdateConfigStore(cfgVm);
                    cfg.ConfigurationStoreID = Guid.NewGuid();
                  
                    try
                    {
                        _configurationStoreService.Add(cfg);
                        _configurationStoreService.SaveChanges();

                        var responseData = Mapper.Map<ConfigurationStore, ConfigurationStoreViewModel>(cfg);
                        response = request.CreateResponse(HttpStatusCode.Created, responseData);
                    }
                    catch
                    {
                    }
                }
                return response;
            });
        }

        [Route("updateConfig")]
        [HttpPut]
        public HttpResponseMessage UpdateConfig(HttpRequestMessage request, ConfigurationStoreViewModel cfgVm)
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
                    var config = _configurationStoreService.GetByID(cfgVm.ConfigurationStoreID);
                    config.UpdateConfigStore(cfgVm);

                    _configurationStoreService.Update(config);
                    _configurationStoreService.SaveChanges();

                    var responseData = Mapper.Map<ConfigurationStore, ConfigurationStoreViewModel>(config);
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
                    _configurationStoreService.Delete(id);
                    _configurationStoreService.SaveChanges();

                    var responseData = Mapper.Map<ConfigurationStore, ConfigurationStoreViewModel>(_configurationStoreService.GetByID(id));
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
