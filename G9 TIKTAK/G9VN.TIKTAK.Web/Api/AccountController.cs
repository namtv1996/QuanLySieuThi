using AutoMapper;
using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.SYSTEM.Models;
using G9VN.TIKTAK.Web.App_Start;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiControllerBase
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private IApplicationUserService _appUserService;

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager,
            IApplicationUserService appUserService,
            IErrorService errorService) : base(errorService)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            _appUserService = appUserService;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<HttpResponseMessage> Login(HttpRequestMessage request, string userName, string password, bool rememberMe)
        {
            if (!ModelState.IsValid)
            {
                return request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(userName, password, rememberMe, shouldLockout: false);
            return request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("signout")]
        public async Task<HttpResponseMessage> SignOut(HttpRequestMessage request)
        {
            var authentication = HttpContext.Current.GetOwinContext().Authentication;

            authentication.SignOut(DefaultAuthenticationTypes.ExternalBearer);

            return request.CreateResponse(HttpStatusCode.OK);
        }


        [Route("users")]
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                //tìm kiếm user theo tên tài khoản 
                var listApplicationUser = _userManager.FindByName(User.Identity.Name);

                ApplicationUserViewModel userVM = Mapper.Map<ApplicationUser, ApplicationUserViewModel>(listApplicationUser);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, userVM);

                return response;
            });
        }
        [Route("GetUser")]
        [HttpGet]
        public HttpResponseMessage GetUser(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listApplicationUser = _appUserService.GetAll(User.Identity.Name);

                IEnumerable<ApplicationUserViewModel> userVM = Mapper.Map<IEnumerable<ApplicationUser>, IEnumerable<ApplicationUserViewModel>>(listApplicationUser);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, userVM);

                return response;
            });
        }

        [Route("store")]
        [HttpGet]
        public HttpResponseMessage GetStoreByUser(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var store = _appUserService.getStoreByUserName(User.Identity.Name);

                var storeVM = Mapper.Map<ManageStore, ManageStoreViewModel>(store);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, storeVM);

                return response;
            });
        }

        [Route("user/{id:guid}", Name = "GetUserById")]
        [HttpGet]
        public HttpResponseMessage GetUserById(HttpRequestMessage request, string Id)
        {
            return CreateHttpResponse(request, () =>
            {
                var user = _userManager.FindByIdAsync(Id);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, user);

                return response;
            });
        }

        [Route("user/{username}")]
        [HttpGet]
        public HttpResponseMessage GetUserByName(HttpRequestMessage request, string username)
        {
            return CreateHttpResponse(request, () =>
            {
                var user = _userManager.FindByNameAsync(username);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, user);


                return response;
            });
        }

        [Route("ChangePassword")]
        [HttpPut]
        public HttpResponseMessage ChangePassword(HttpRequestMessage request, ChangePasswordViewModel model)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    IdentityResult result = _userManager.ChangePassword(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
                    response = request.CreateResponse(HttpStatusCode.Created, result);
                }

                return response;
            });
        }

        [Route("user/{id:guid}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUser(HttpRequestMessage request, string id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    ApplicationUser appUser = _userManager.FindById(id);
                    if (appUser != null)
                    {
                        IdentityResult result = _userManager.Delete(appUser);
                        response = request.CreateResponse(HttpStatusCode.Created, result);
                    }
                }

                return response;
            });
        }
    }
}