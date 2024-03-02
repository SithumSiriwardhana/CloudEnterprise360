using System.ComponentModel.DataAnnotations;

namespace CloudEnterprise360API.DTOs.Authentication
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
