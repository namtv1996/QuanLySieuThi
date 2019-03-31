using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace G9VN.TIKTAK.Web.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Bạn cần nhập tên.")]
        public string FullName { get; set; }
        public string Address { get; set; }

        [Required(ErrorMessage = "Bạn cần nhập Email.")]
        [EmailAddress(ErrorMessage = "Địa chỉ email không đúng.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Bạn cần nhập số điện thoại.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Bạn cần nhập tài khoản.")]
        [MinLength(6, ErrorMessage = "Tài khoản phải có ít nhất 6 ký tự")]
        [MaxLength(32, ErrorMessage = "Tài khoản có nhiều nhất 32 ký tự")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Bạn cần nhập tên cửa hàng.")]
        public string StoreName { set; get; }

        [Required(ErrorMessage = "Bạn cần chọn lĩnh vực kinh doanh.")]
        public string Business { set; get; }

        [Required(ErrorMessage = "Bạn cần nhập mật khẩu.")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự")]
        [MaxLength(32, ErrorMessage = "Mật khẩu có nhiều nhất 32 ký tự")]
        public string Password { get; set; }
    }
}