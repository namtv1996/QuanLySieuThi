﻿using System.Web;
using System.Web.Mvc;

namespace G9VN.TIKTAK.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
