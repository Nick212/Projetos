using System;
using System.Web.Http;
using Dotz.Core.Business.Administracao.Aplicacao.Interface;
using Dotz.Core.Business.ContaCorrente.Usuario.Interface;
using Dotz.Core.Data.Administracao.Aplicacao.Model.Entities;
using Dotz.Core.Data.Administracao.Aplicacao.Model.ValueObjects;


namespace SwLoginAPI.Controllers
{
    [RoutePrefix("api")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("user")]
        public IHttpActionResult GetIdentifierUser(string document)
        {
            var user = DotzCore.GetBusinessService<IUsuarioBSvc>().ObterUsuarioPorIdentificador(document);
            if (user != null)
            {
                return Ok(new
                {
                    Message = "Sucesso na verificação do usuario",
                    HasError = false,
                    Object = user
                });
            }
            return Ok(new
            {
                Message = "Erro na verificação do usuario",
                HasError = true,
                Object = user
            });
        }

        /// <summary>
        /// App envia Token a partir da leitura do Qrcode(Token)
        /// </summary>
        /// <param name="token">Token</param>
        /// <returns></returns>
        [HttpGet]
        [Route("auth")]
        public IHttpActionResult AuthQrCode(string token, int idAutorRequest)
        {

            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();
            var usuarioBsvc = DotzCore.GetBusinessService<IUsuarioBSvc>();
            var user = usuarioBsvc.ObterUsuarioPorId(idAutorRequest);

            var usuarioId = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["USUARIO_VALIDATOR_TOKEN"]);
            var aplicacaoId = new Guid(System.Configuration.ConfigurationManager.AppSettings["APLICACAO_ID_SITE"]);

            var validToken = tokenBsvc.ObterPorToken(token);
            var guIdtoken = new Guid(token);

            if (validToken != null && user != null)
            {
                
                var alterResult = tokenBsvc.Alterar(new AdmTokenFila()
                {
                    AplicacaoId = new Guid(System.Configuration.ConfigurationManager.AppSettings["APLICACAO_ID_SITE"]),
                    Token = new Guid(token),
                    Documento = user.Documento,
                    IdAutorRequisicao = idAutorRequest,
                    UsuarioId =  validToken.UsuarioId,
                    DataInclusao = validToken.DataInclusao,
                    DataUtilizacao = validToken.DataUtilizacao,
                    Extra = validToken.Extra,
                    Tipo = validToken.Tipo,
                    ValidoAte = validToken.ValidoAte
                });
                var isValidToken = tokenBsvc.ValidarToken(guIdtoken, aplicacaoId, usuarioId);

                if (isValidToken && !(alterResult <= 0))
                {
                    return Ok(new
                    {
                        Message = "Sucesso na autenticacao do Token",
                        HasError = false,
                        Object = isValidToken
                    });
                }
            }
            return Ok(new
            {
                Message = "Erro na autenticacao do Token",
                HasError = true,
                Object = validToken
            });
        }
        
        /// <summary>
        /// Web Site Solicita Token
        /// </summary>
        /// <returns> Action Result of the Request HTTP </returns>
        [HttpGet]
        [Route("generatorToken")]
        public IHttpActionResult GerarToken()
        {
            var newToken = GetNewToken();
            if (newToken != null)
            {
                return Ok(new
                {
                    Message = "Sucesso ao Gerar o Token",
                    HasError = false,
                    Object = newToken
                });

            }
            return Ok(new
            {
                Message = "Erro ao Gerar Token",
                HasError = true,
                Object = newToken
            });
        }

        private AdmTokenFila GetNewToken()
        {
            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();
            var usuarioId = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["USUARIO_GENERETOR_TOKEN"]);
            var tempoExpiracaoResgateSenha = DotzCore.Application.Parameters.Get<int>("TEMPO_EXPIRACAO_RESGATE_SENHA_EMAIL");
            var aplicacaoId = System.Configuration.ConfigurationManager.AppSettings["APLICACAO_ID_SITE"];

            var tokenGerado = tokenBsvc.CriarToken(eTipoTokenFila.AutenticacaoUsuario, usuarioId, DateTime.Now.AddMinutes(tempoExpiracaoResgateSenha),aplicacaoId);

            return tokenGerado;
        }

        [HttpGet]
        [Route("verifyToken")]
        public IHttpActionResult VerifyAuthToken(string token)
        {
            //Todo  -   Verificar se está tendo mais que uma requisição Limitar no maximo 3 requisição por Ip, a partir do primeiro request

            var tokenBsvc = DotzCore.GetBusinessService<ITokenBSvc>();
            var guidToken = new Guid(token);

            var statusToken = tokenBsvc.Consultar(guidToken);


            if (statusToken != null)
            {
                return Ok(new
                {
                    Message = "Sucesso ao Verificar o Token",
                    HasError = false,
                    Object = statusToken
                }); 
            }
            return Ok(new
            {
                Message = "Erro ao Verifcar Token",
                HasError = true,
                Object = statusToken
            });
        }
    }
}
