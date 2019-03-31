using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class TransportPartnersViewModel
    {
        public string token { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ContactPhone { get; set; }
        public string ContactName { get; set; }
        public int PaymentTypeID { get; set; }
        public int FromDistrictID { get; set; }
        public string FromWardCode { get; set; }
        public int ToDistrictID { get; set; }
        public string ToWardCode { get; set; }
        public string Note { get; set; }
        public string SealCode { get; set; }
        public string ExternalCode { get; set; }
        public string ClientContactName { get; set; }
        public string ClientContactPhone { get; set; }
        public string ClientAddress { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string ShippingAddress { get; set; }
        public int CoDAmount { get; set; }
        public string NoteCode { get; set; }
        public int InsuranceFee { get; set; }
        public int ClientHubID { get; set; }
        public int ServiceID { get; set; }
        public int serviceID { get; set; }
        public int ToLatitude { get; set; }
        public int ToLongitude { get; set; }
        public int FromLat { get; set; }
        public int FromLng { get; set; }
        public string Content { get; set; }
        public string CouponCode { get; set; }
        public int Weight { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public Boolean CheckMainBankAccount { get; set; }
        public string ReturnContactPhone { get; set; }
        public string ReturnAddress { get; set; }
        public string ReturnDistrictCode { get; set; }
        public string ExternalReturnCode { get; set; }
        public Boolean IsCreditCreate { get; set; }
        public string ReturnContactName { get; set; }

    }
}
