using System;
using System.Web;
using System.Collections.Generic;
//using DotzSite2010.Classes.Sessoes;

/// <summary>
/// Implementação de uma Unity Of Work que é responsável por gerenciar o acesso a camada de negocios DotzCore.
/// </summary>
public static class DotzCore
{
	private const string keyContextItem = "DotzCoreManager";

	private static Dotz.Core.Framework.Manager.DotzCoreManager DotzCoreManager
	{
		get
		{
            if(HttpContext.Current == null)
            {
                return new Dotz.Core.Framework.Manager.DotzCoreManager();
            }
            if (HttpContext.Current.Items[keyContextItem] == null)
            {
                Dotz.Core.Framework.Manager.DotzCoreManager dotzCoreManager = new Dotz.Core.Framework.Manager.DotzCoreManager();

                string ipAddress = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (ipAddress == null || ipAddress.ToLower() == "unknown")
                    ipAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];

                dotzCoreManager.Application.InstanceInfo.IP = ipAddress;

                HttpContext.Current.Items[keyContextItem] = dotzCoreManager;
            }
			return (Dotz.Core.Framework.Manager.DotzCoreManager)HttpContext.Current.Items[keyContextItem];
		}
	}

	/// <summary>
	/// Contem informações relacionadas a aplicação que está utilizando o DotzCore.
	/// </summary>
	public static Dotz.Core.Framework.Manager.DotzCoreApplication Application	{ get { return DotzCoreManager.Application; } }

	/// <summary>
	/// Retorna instância do Business Services a ser utilizado.
	/// </summary>
	/// <typeparam name="T">Tipo do Business Service que deve ser instânciado.</typeparam>
	/// <returns>Instância do Business Service</returns>
	public static T GetBusinessService<T>() where T : class
	{
		return DotzCoreManager.GetBusinessService<T>();
	}

	/// <summary>
	/// Liberar recursos usados pelo DotzCore, Serviços, Contexto e Conexões
	/// </summary>
	public static void Dispose()
	{
		if (HttpContext.Current.Items[keyContextItem] != null)
		{
			((Dotz.Core.Framework.Manager.DotzCoreManager)HttpContext.Current.Items[keyContextItem]).Dispose();
			HttpContext.Current.Items.Remove(keyContextItem);
		}
	}
}