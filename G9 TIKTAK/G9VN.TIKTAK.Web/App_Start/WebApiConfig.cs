using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace G9VN.TIKTAK.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        //    config.Routes.MapHttpRoute(
        //       name: "DefaultApi1",
        //       routeTemplate: "api/{controller}/{id1}/{id2}",
        //       defaults: new { controller= "itemOption" }
        //   );
        }
    }
}
