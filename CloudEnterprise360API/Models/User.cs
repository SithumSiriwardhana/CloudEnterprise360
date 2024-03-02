using Microsoft.AspNetCore.Identity;
using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace CloudEnterprise360API.Models
{
    public class User :IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
   
        [Required]
        public string LastName { get; set; }
        
        public DateTime SetupDateTime { get; set; } = DateTime.UtcNow;

    }
}
