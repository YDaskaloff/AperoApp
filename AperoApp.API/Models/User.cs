using System;

namespace AperoApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; } 
        public DateTime LastActive { get; set; }
        public string Role { get; set; }
    }
}