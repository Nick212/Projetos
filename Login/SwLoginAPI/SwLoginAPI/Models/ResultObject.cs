using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebGrease;

namespace SwLoginAPI.Models
{
    public class ResultObject
    {
        public ResultObject() { }

        public ResultObject(string message, bool hasError)
        {
            Message = message;
            HasError = hasError;
        }

        public ResultObject(bool hasError)
        {
            Message = string.Empty;
            HasError = hasError;
        }

        public string Message { get; set; }

        public bool HasError { get; set; }

        public object Object { get; set; }
    }
}