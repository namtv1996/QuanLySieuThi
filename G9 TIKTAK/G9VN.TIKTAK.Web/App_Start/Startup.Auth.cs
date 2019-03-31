using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.SYSTEM.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

[assembly: OwinStartup(typeof(G9VN.TIKTAK.Web.App_Start.Startup))]

namespace G9VN.TIKTAK.Web.App_Start
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(TIKTAK_SYSTEM_DbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            app.CreatePerOwinContext<UserManager<ApplicationUser>>(CreateManager);
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {

                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/oauth/token"),
                //thời gian out ra khi không thao tác
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new AuthorizationServerProvider(),
                RefreshTokenProvider = new SimpleRefreshTokenProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            //// Configure the db context, user manager and signin manager to use a single instance per request
            //app.CreatePerOwinContext(TIKTAK_SYSTEM_DbContext.Create);
            //app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            //app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            //app.CreatePerOwinContext<UserManager<ApplicationUser>>(CreateManager);
            //app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            //{
            //    TokenEndpointPath = new PathString("/oauth/token"),
            //    Provider = new AuthorizationServerProvider(),
            //    RefreshTokenProvider = new SimpleRefreshTokenProvider(),
            //    AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
            //    AllowInsecureHttp = true
            //});
            //app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "",
            //    ClientSecret = ""
            //});
        }

        public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
        {
            //check client là loại gì, app hay là web angularjs
            public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
            {
                string clientId = string.Empty;
                string clientSecret = string.Empty;
                Client client = null;

                if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
                {
                    context.TryGetFormCredentials(out clientId, out clientSecret);
                }

                if (context.ClientId == null)
                {
                    //Remove the comments from the below line context.SetError, and invalidate context 
                    //if you want to force sending clientId/secrects once obtain access tokens. 
                    context.Validated();
                    //context.SetError("invalid_clientId", "ClientId should be sent.");
                    return Task.FromResult<object>(null);
                }

                using (AuthRepository _repo = new AuthRepository())
                {
                    client = _repo.FindClient(context.ClientId);
                }

                if (client == null)
                {
                    context.SetError("invalid_clientId", string.Format("Client '{0}' is not registered in the system.", context.ClientId));
                    return Task.FromResult<object>(null);
                }

                if (client.ApplicationType == ApplicationTypes.NativeConfidential)
                {
                    if (string.IsNullOrWhiteSpace(clientSecret))
                    {
                        context.SetError("invalid_clientId", "Client secret should be sent.");
                        return Task.FromResult<object>(null);
                    }
                    else
                    {
                        if (client.Secret != Helper.GetHash(clientSecret))
                        {
                            context.SetError("invalid_clientId", "Client secret is invalid.");
                            return Task.FromResult<object>(null);
                        }
                    }
                }

                if (!client.Active)
                {
                    context.SetError("invalid_clientId", "Client is inactive.");
                    return Task.FromResult<object>(null);
                }

                context.OwinContext.Set<string>("as:clientAllowedOrigin", client.AllowedOrigin);
                context.OwinContext.Set<string>("as:clientRefreshTokenLifeTime", client.RefreshTokenLifeTime.ToString());

                context.Validated();
                return Task.FromResult<object>(null);
            }

            public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
            {

                var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

                if (allowedOrigin == null) allowedOrigin = "*";

                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
                UserManager<ApplicationUser> userManager = context.OwinContext.GetUserManager<UserManager<ApplicationUser>>();
                ApplicationUser user;

                using (AuthRepository _repo = new AuthRepository())
                {
                    user = await _repo.FindUser(context.UserName, context.Password);

                    if (user == null)
                    {
                        context.SetError("invalid_grant", "Tài khoản hoặc mật khẩu không đúng.");
                        return;
                    }
                }
                ClaimsIdentity identity = await userManager.CreateIdentityAsync(
                                                          user,
                                                          DefaultAuthenticationTypes.ExternalBearer);
                //var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                //identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                //identity.AddClaim(new Claim("sub", context.UserName));
                //identity.AddClaim(new Claim("role", "user"));

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    {
                        "userName", context.UserName
                    }
                });

                var ticket = new AuthenticationTicket(identity, props);
                context.Validated(ticket);
            }
            public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
            {
                var originalClient = context.Ticket.Properties.Dictionary["as:client_id"];
                var currentClient = context.ClientId;

                if (originalClient != currentClient)
                {
                    context.SetError("invalid_clientId", "Refresh token is issued to a different clientId.");
                    return Task.FromResult<object>(null);
                }

                // Change auth ticket for refresh token requests
                var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

                var newClaim = newIdentity.Claims.Where(c => c.Type == "newClaim").FirstOrDefault();
                if (newClaim != null)
                {
                    newIdentity.RemoveClaim(newClaim);
                }
                newIdentity.AddClaim(new Claim("newClaim", "newValue"));

                var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
                context.Validated(newTicket);

                return Task.FromResult<object>(null);
            }

            public override Task TokenEndpoint(OAuthTokenEndpointContext context)
            {
                foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
                {
                    context.AdditionalResponseParameters.Add(property.Key, property.Value);
                }

                return Task.FromResult<object>(null);
            }
        }
        public class SimpleRefreshTokenProvider : IAuthenticationTokenProvider
        {
            public async Task CreateAsync(AuthenticationTokenCreateContext context)
            {
                var clientid = context.Ticket.Properties.Dictionary["as:client_id"];

                if (string.IsNullOrEmpty(clientid))
                {
                    return;
                }

                var refreshTokenId = Guid.NewGuid().ToString("n");

                using (AuthRepository _repo = new AuthRepository())
                {
                    var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");

                    var token = new RefreshToken()
                    {
                        Id = Helper.GetHash(refreshTokenId),
                        ClientId = clientid,
                        Subject = context.Ticket.Identity.Name,
                        IssuedUtc = DateTime.UtcNow,
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
                    };

                    context.Ticket.Properties.IssuedUtc = token.IssuedUtc;
                    context.Ticket.Properties.ExpiresUtc = token.ExpiresUtc;

                    token.ProtectedTicket = context.SerializeTicket();

                    var result = await _repo.AddRefreshToken(token);

                    if (result)
                    {
                        context.SetToken(refreshTokenId);
                    }
                    //kiem tra version
                    try
                    {
                        //gọi bảng để lấy version
                        ManageStore store = _repo.GetStoreByUserName(context.Ticket.Identity.Name);
                        string strOldVersion = store.Version;
                        int intOldG9VCID = 0;
                        int intNewG9VCID = 0;
                        string[] arrOldVersionParttens = strOldVersion.Split('.');
                        string[] arrNewVersionParttens = Assembly.GetExecutingAssembly().GetName().Version.ToString().Split('.');
                        intOldG9VCID = Convert.ToInt32(arrOldVersionParttens[0]) * 1000 + Convert.ToInt32(arrOldVersionParttens[1]) * 100 + Convert.ToInt32(arrOldVersionParttens[2]) * 10 + Convert.ToInt32(arrOldVersionParttens[3]);
                        intNewG9VCID = Convert.ToInt32(arrNewVersionParttens[0]) * 1000 + Convert.ToInt32(arrNewVersionParttens[1]) * 100 + Convert.ToInt32(arrNewVersionParttens[2]) * 10 + Convert.ToInt32(arrNewVersionParttens[3]);
                        if (intOldG9VCID < intNewG9VCID)
                        {
                            string strNewVersion = "";
                            string sFileG9VCName = @"C:\inetpub\vhosts\tiktac.vn\httpdocs\POS\bin\G9UPDATETIKTAC.xml";
                            DataSet dsG9DBVC = new DataSet();
                            dsG9DBVC.ReadXml(sFileG9VCName, XmlReadMode.ReadSchema);
                            intOldG9VCID = Convert.ToInt32(arrOldVersionParttens[0]) * 10000 + Convert.ToInt32(arrOldVersionParttens[1]) * 1000 + Convert.ToInt32(arrOldVersionParttens[2]) * 100 + Convert.ToInt32(arrOldVersionParttens[3]) * 10 + 9;
                            DataRow[] arrMVC = dsG9DBVC.Tables[0].Select("G9VCID >'" + intOldG9VCID.ToString() + "'").OrderBy(x => x["G9VCID"]).ToArray();
                            //từ đây trở đi connect đến data khách hàng
                            ConnectDatabase.ConnectServer();
                            foreach (DataRow dr in arrMVC)
                            {
                                strNewVersion = (string)(dr["G9Version"].ToString().Trim());

                                if (!strOldVersion.Equals(strNewVersion) && strOldVersion.Length > 0)
                                {
                                    store.Version = strOldVersion;
                                    _repo.UpdateVersion(store);
                                }

                                if (dr["SQLText"].ToString().Length > 0)
                                {
                                    ConnectDatabase.RunSQLCommandText(dr["SQLText"].ToString(), "G9TIKTAC_" + store.StoreName);
                                }
                                strOldVersion = strNewVersion;
                            }
                            store.Version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
                            _repo.UpdateVersion(store);
                        }
                    }
                    catch (Exception ex)
                    {
                        string filePath = HttpContext.Current.Server.MapPath("~\\Error.txt");

                        using (StreamWriter writer = new StreamWriter(filePath, true))
                        {
                            writer.WriteLine("Message :" + ex.Message + "<br/>" + Environment.NewLine + "StackTrace :" + ex.StackTrace +
                               "" + Environment.NewLine + "Date :" + DateTime.Now.ToString());
                            writer.WriteLine(Environment.NewLine + "-----------------------------------------------------------------------------" + Environment.NewLine);
                        }
                    }
                }
            }

            public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
            {

                var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

                string hashedTokenId = Helper.GetHash(context.Token);

                using (AuthRepository _repo = new AuthRepository())
                {
                    var refreshToken = await _repo.FindRefreshToken(hashedTokenId);

                    if (refreshToken != null)
                    {
                        //Get protectedTicket from refreshToken class
                        context.DeserializeTicket(refreshToken.ProtectedTicket);
                        var result = await _repo.RemoveRefreshToken(hashedTokenId);
                    }
                }
            }

            public void Create(AuthenticationTokenCreateContext context)
            {
                throw new NotImplementedException();
            }

            public void Receive(AuthenticationTokenReceiveContext context)
            {
                throw new NotImplementedException();
            }
        }

        private static UserManager<ApplicationUser> CreateManager(IdentityFactoryOptions<UserManager<ApplicationUser>> options, IOwinContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context.Get<TIKTAK_SYSTEM_DbContext>());
            var owinManager = new UserManager<ApplicationUser>(userStore);
            return owinManager;
        }
        
    }
}