using System.ComponentModel.DataAnnotations;

namespace AperoApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 7, ErrorMessage = "Password must be between 7 and 16 characters.")]
        
        public string Password { get; set; }
    }
}