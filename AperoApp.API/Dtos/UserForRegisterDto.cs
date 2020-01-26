using System;
using System.ComponentModel.DataAnnotations;

namespace AperoApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 7, ErrorMessage = "Password must be between 7 and 16 characters.")]        
        public string Password { get; set; }

        public DateTime Created {get; set;}
        public DateTime LastActive { get; set; }
        
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}