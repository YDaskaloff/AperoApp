using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AperoApp.API.Data;
using AperoApp.API.Dtos;
using AperoApp.API.Helpers;
using AperoApp.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AperoApp.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository authRepo, IUserRepository userRepo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _userRepo = userRepo;
            _config = config;
            _authRepo = authRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _authRepo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            return BuildToken(userFromRepo);
        }

        private IActionResult BuildToken(User userFromRepo)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
                new Claim(ClaimTypes.Role, userFromRepo.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config
                .GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForLocalDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token), user
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (userForUpdateDto.Username != "" && userForUpdateDto.Username != null) 
            {
                userForUpdateDto.Username = userForUpdateDto.Username.ToLower();
                if (await _authRepo.UserExists(userForUpdateDto.Username))
                    return BadRequest("A user with that name already exists"); 
            }

            if (userForUpdateDto.Email != "" && userForUpdateDto.Username != null) 
            {
                if (await _authRepo.UserExists(userForUpdateDto.Email))
                    return BadRequest("A user with that email already exists"); 
            }               

            var userForUpdate = _mapper.Map<User>(userForUpdateDto);

            var updatedUser = await _authRepo.UpdateUser(id, userForUpdate, userForUpdateDto.Password);

            var userToReturn = _mapper.Map<UserForLocalDto>(updatedUser);

            if (await _userRepo.SaveAll())
                return CreatedAtRoute("GetUser", new {controller = "Admin", id = updatedUser.Id}, userToReturn);
            
            throw new Exception($"Updating user {id} failed on save");
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }            
        }
    }
}