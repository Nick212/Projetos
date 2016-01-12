using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SwLoginAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ConfigureApiErrors();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        private void ConfigureApiErrors()
        {
            var config = (CustomErrorsSection)ConfigurationManager.GetSection("system.web/customErrors");

            IncludeErrorDetailPolicy errorDetailPolicy;

            switch (config.Mode)
            {
                case CustomErrorsMode.RemoteOnly:
                    errorDetailPolicy = IncludeErrorDetailPolicy.LocalOnly;
                    break;
                case CustomErrorsMode.On:
                    errorDetailPolicy = IncludeErrorDetailPolicy.Never;
                    break;
                case CustomErrorsMode.Off:
                    errorDetailPolicy = IncludeErrorDetailPolicy.Always;
                    break;
                default:
                    errorDetailPolicy = IncludeErrorDetailPolicy.Never;
                    break;
            }

            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy
                = errorDetailPolicy;
        }
    }
}
