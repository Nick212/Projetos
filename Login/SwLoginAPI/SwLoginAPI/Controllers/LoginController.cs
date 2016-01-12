using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwLoginAPI.Models;

namespace SwLoginAPI.Controllers
{
    public class LoginController : ApiController
    {
       
        [HttpGet]
        [Route("api/login")]
        public ResultObject LoginQrCode(string id)
        {
            return new ResultObject()
            {
                Message = "SUCESSO",
                HasError = false,
                Object = "ASDAD"
            };
        }


    }
}
