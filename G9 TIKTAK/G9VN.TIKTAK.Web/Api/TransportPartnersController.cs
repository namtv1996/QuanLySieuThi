using G9VN.TIKTAK.Service;
using G9VN.TIKTAK.Web.Infrastructure.Core;
using G9VN.TIKTAK.Web.Models;
using RestSharp;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace G9VN.TIKTAK.Web.Api
{
    [RoutePrefix("api/transportpartners")]
    [Authorize]
    public class TransportPartnersController : ApiControllerBase
    {
       

        public TransportPartnersController(IErrorService errorService) : base(errorService)
        {
        }
        [Route("GHNSignUp")]
        [HttpPost]
        public HttpResponseMessage Post1(HttpRequestMessage request, TransportPartnersViewModel list)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/SignUp");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "412008ba-a705-4917-a068-119aba7b818b");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"5af2c4d91070b029183361cf\",\r\n    \"Email\": \"" + list.Email+"\",\r\n    \"Password\": \""+list.Password+"\",\r\n    \"ContactPhone\": \""+list.ContactPhone+"\",\r\n    \"ContactName\": \""+list.ContactName+"\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response);
            return responsea;
        }
        [Route("GHNSignIn")]
        [HttpPost]
        public HttpResponseMessage Post2(HttpRequestMessage request, TransportPartnersViewModel list)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/SignIn");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "19bc017e-8377-41b4-a66b-e40c570a0d2e");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"5af2c4d91070b029183361cf\",\r\n    \"Email\": \""+list.Email+"\",\r\n    \"Password\": \""+list.Password+"\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;
        }
        [Route("GHNCreateOrder")]
        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, TransportPartnersViewModel list)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/CreateOrder");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "134c8e79-eb37-4d87-b2f3-1e8d7dfb3f30");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            var str = "{\r\n    \"token\": \""+list.token+ "\",\r\n    \"PaymentTypeID\":"+list.PaymentTypeID+ ",\r\n    \"FromDistrictID\": "+list.FromDistrictID+ ",\r\n    \"FromWardCode\": \"" + list.FromWardCode+ "\",\r\n    \"ToDistrictID\": " + list.ToDistrictID+ ",\r\n    \"ToWardCode\": \"" + list.ToWardCode+ "\",\r\n    \"Note\": \"" + list.Note+ "\",\r\n    \"SealCode\": \"" + list.SealCode+ "\",\r\n    \"ExternalCode\": \"" + list.ExternalCode+ "\",\r\n    \"ClientContactName\": \"" + list.ClientContactName+ "\",\r\n    \"ClientContactPhone\": \"" + list.ClientContactPhone+ "\",\r\n    \"ClientAddress\": \"" + list.ClientAddress+ "\",\r\n    \"CustomerName\": \"" + list.CustomerName+ "\",\r\n    \"CustomerPhone\": \"" + list.CustomerPhone+ "\",\r\n    \"ShippingAddress\": \"" + list.ShippingAddress+ "\",\r\n    \"CoDAmount\": " + list.CoDAmount+ ",\r\n    \"NoteCode\": \"" + list.NoteCode+ "\",\r\n    \"InsuranceFee\": " + list.InsuranceFee+ ",\r\n    \"ClientHubID\": " + list.ClientHubID+ ",\r\n    \"ServiceID\": "+list.ServiceID+ ",\r\n    \"ToLatitude\": " + list.ToLatitude+ ",\r\n    \"ToLongitude\": " + list.ToLongitude+ ",\r\n    \"FromLat\":" + list.FromLat+ ",\r\n    \"FromLng\": " + list.FromLng+ ",\r\n    \"Content\": \"" + list.Content+ "\",\r\n    \"CouponCode\": \"" + list.CouponCode+ "\",\r\n    \"Weight\": " + list.Weight+ ",\r\n    \"Length\": " + list.Length+ ",\r\n    \"Width\": " + list.Width+ ",\r\n    \"Height\": " + list.Height+ ",\r\n    \"CheckMainBankAccount\": "+list.CheckMainBankAccount.ToString().ToLower()+ ",\r\n    \"ShippingOrderCosts\":\r\n    [\r\n        {\r\n            \"ServiceID\": " + list.ServiceID+ "\r\n        }\r\n    ],\r\n    \"ReturnContactName\": \"" + list.ReturnContactName+ "\",\r\n    \"ReturnContactPhone\": \"" + list.ReturnContactPhone+ "\",\r\n    \"ReturnAddress\": \"" + list.ReturnAddress+ "\",\r\n    \"ReturnDistrictCode\": \"" + list.ReturnDistrictCode+ "\",\r\n    \"ExternalReturnCode\": \"" + list.ExternalReturnCode+ "\",\r\n    \"IsCreditCreate\": "+list.IsCreditCreate.ToString().ToLower()+"\r\n}";
            req.AddParameter("undefined",str , ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;
        }
        [Route("GHNCancelOrder")]
        [HttpPost]
        public HttpResponseMessage Post3(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/CancelOrder");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "98905a39-5f1a-45cd-8f1f-59d4ef730cc5");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"TokenTest\",\r\n    \"OrderCode\": \"23FNQY46\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }
        [Route("GHNUpdateOrder")]
        [HttpPost]
        public HttpResponseMessage Post4(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/UpdateOrder");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "134c8e79-eb37-4d87-b2f3-1e8d7dfb3f30");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"TokenTest\",\r\n    \"PaymentTypeID\": 1,\r\n    \"FromDistrictID\": 1455,\r\n    \"FromWardCode\": \"21402\",\r\n    \"ToDistrictID\": 1462,\r\n    \"ToWardCode\": \"21609\",\r\n    \"Note\": \"Tạo ĐH qua API\",\r\n    \"SealCode\": \"tem niêm phong\",\r\n    \"ExternalCode\": \"\",\r\n    \"ClientContactName\": \"client name\",\r\n    \"ClientContactPhone\": \"0987654321\",\r\n    \"ClientAddress\": \"140 Lê Trọng Tấn\",\r\n    \"CustomerName\": \"Nguyễn Văn A\",\r\n    \"CustomerPhone\": \"01666666666\",\r\n    \"ShippingAddress\": \"137 Lê Quang Định\",\r\n    \"CoDAmount\": 1500000,\r\n    \"NoteCode\": \"CHOXEMHANGKHONGTHU\",\r\n    \"InsuranceFee\": 0,\r\n    \"ClientHubID\": 0,\r\n    \"ServiceID\": 53319,\r\n    \"ToLatitude\": 1.2343322,\r\n    \"ToLongitude\": 10.54324322,\r\n    \"FromLat\": 1.2343322,\r\n    \"FromLng\": 10.54324322,\r\n    \"Content\": \"Test nội dung\",\r\n    \"CouponCode\": \"\",\r\n    \"Weight\": 10200,\r\n    \"Length\": 10,\r\n    \"Width\": 10,\r\n    \"Height\": 10,\r\n    \"CheckMainBankAccount\": false,\r\n    \"ShippingOrderCosts\":\r\n    [\r\n        {\r\n            \"ServiceID\": 53332\r\n        }\r\n    ],\r\n    \"ReturnContactName\": \"\",\r\n    \"ReturnContactPhone\": \"\",\r\n    \"ReturnAddress\": \"\",\r\n    \"ReturnDistrictCode\": \"\",\r\n    \"ExternalReturnCode\": \"\",\r\n    \"IsCreditCreate\": true\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }
        [Route("GHNOrderInfo")]
        [HttpPost]
        public HttpResponseMessage Post5(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/OrderInfo");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "7f3dbf3f-cb67-4573-891a-50868b046367");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"TokenTest\",\r\n    \"OrderCode\": \"23FNQY46\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;
        }
        [Route("GHNOrderInfo")]
        [HttpPost]
        public HttpResponseMessage Post6(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/CalculateFee");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "1585eba5-73c3-4d9d-b598-23525c31ccec");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"TokenTest\",\r\n    \"Weight\": 10000,\r\n    \"Length\": 10,\r\n    \"Width\": 110,\r\n    \"Height\": 20,\r\n    \"FromDistrictID\": 1443,\r\n    \"ToDistrictID\": 1452,\r\n    \"ServiceID\": 53319,\r\n    \"OrderCosts\": [\r\n        {\r\n            \"ServiceID\": 100022\r\n        },\r\n        {\r\n            \"ServiceID\": 53337\r\n        }\r\n    ],\r\n    \"CouponCode\": \"COUPONTEST\",\r\n    \"InsuranceFee\": 1000003\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }
        [Route("GHNGetDistricts")]
        [HttpPost]
        public HttpResponseMessage Post7(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/GetDistricts");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "1585eba5-73c3-4d9d-b598-23525c31ccec");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"5af2c4d91070b029183361cf\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }
        [Route("GHNGetWards")]
        [HttpPost]
        public HttpResponseMessage Post8(HttpRequestMessage request)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/GetWards");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "1585eba5-73c3-4d9d-b598-23525c31ccec");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \"5af2c4d91070b029183361cf\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }
        [Route("GHNGetHubs")]
        [HttpPost]
        public HttpResponseMessage Post9(HttpRequestMessage request, TransportPartnersViewModel list)
        {
            var client = new RestClient("https://console.ghn.vn/api/v1/apiv3/GetHubs");
            var req = new RestRequest(Method.POST);
            req.AddHeader("Postman-Token", "1585eba5-73c3-4d9d-b598-23525c31ccec");
            req.AddHeader("Cache-Control", "no-cache");
            req.AddHeader("Content-Type", "application/json");
            req.AddParameter("undefined", "{\r\n    \"token\": \""+list.token+"\"\r\n}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(req);
            HttpResponseMessage responsea = request.CreateResponse(HttpStatusCode.OK, response.Content);
            return responsea;

        }

    }
}