using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using Dotz.Core.Business.Administracao.Aplicacao.Interface;
using Dotz.Core.Data.Administracao.Aplicacao.Model.Entities;
using Dotz.Core.Data.Administracao.Aplicacao.Model.ValueObjects;
using SwLoginAPI.Models;

namespace SwLoginAPI.Controllers
{
    [RoutePrefix("api")]
    public class LoginController : ApiController
    {

        [HttpGet]
        [Route("login")]
        public ResultObject LoginQrCode(string id)
        {
            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();
            

            if (id != null)
            {
                return new ResultObject()
                {
                    Message = "SUCESSO",
                    HasError = true,
                    Object = id
                };
            }
            return new ResultObject()
            {
                Message = "ERRO",
                HasError = false,
                Object = id
            };
        }

        [HttpGet]
        [Route("generatorToken")]
        public IHttpActionResult GerarToken()
        {
            var newToken = GetNewToken();
            if (newToken != null)
            {
                return Ok(new
                {
                    Message
                        = "SUCESSO",
                    HasError = true,
                    Object = newToken
                });

            }
            return Ok(new
            {
                Message = "ERRO",
                HasError = false,
                Object = newToken
            });
        }

        private AdmTokenFila GetNewToken()
        {
            var usuarioId = 7379;

            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();
            
            var tempoExpiracaoResgateSenha = DotzCore.Application.Parameters.Get<int>("TEMPO_EXPIRACAO_RESGATE_SENHA_EMAIL");
            var tokenGerado = tokenBsvc.CriarToken(eTipoTokenFila.AutenticacaoUsuario, usuarioId, DateTime.Now.AddMinutes(tempoExpiracaoResgateSenha));
            
            return tokenGerado;
        }

        private AdmTokenFila getUserToken(Guid token)
        {
            var aplicacationId = "";
            
            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();


            tokenBsvc.CriarToken(eTipoTokenFila.AutenticacaoAniversarioAtualizacaoCadastral,
                1321231,
                DateTime.Now,
                aplicacationId);
            return tokenBsvc.Consultar(token);
        
        
        }

    

    }
}
