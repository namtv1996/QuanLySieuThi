﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace G9VN.TIKTAK.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // BotDetect requests must not be routed
            routes.IgnoreRoute("{*botdetect}", new { botdetect = @"(.*)BotDetectCaptcha\.ashx" });

           // routes.MapRoute(
           //    name: "Register",
           //    url: "dang-ky.html",
           //    defaults: new { controller = "Account", action = "Register", id = UrlParameter.Optional },
           //    namespaces: new string[] { "G9VN.TIKTAK.Web.Controllers" }
           //);
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Admin", action = "Index", id = UrlParameter.Optional }
            );
            
        }
    }
}
