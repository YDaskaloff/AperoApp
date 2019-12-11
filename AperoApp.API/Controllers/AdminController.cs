using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Data;
using AperoApp.API.Dtos;
using AperoApp.API.Helpers;
using AperoApp.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AperoApp.API.Controllers
{
    [AuthorizeRoles(Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserRepository userRepo;
        private readonly IMapper mapper;
        private readonly IAuthRepository authRepo;
        private readonly IRoleRepository roleRepo;
        public AdminController(IAuthRepository _authRepo, IUserRepository _userRepo, IRoleRepository _roleRepo, IMapper _mapper)
        {
            roleRepo = _roleRepo;
            authRepo = _authRepo;
            userRepo = _userRepo;
            mapper = _mapper;
        }

        [HttpGet("members")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await userRepo.GetUsers();

            var usersToReturn = mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await authRepo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await authRepo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("changerole")]
        public async Task<IActionResult> ChangeRole(UserForLoginDto userForLoginDto)
        {
            if (!await authRepo.UserExists(userForLoginDto.Username))
                return BadRequest("User doesn't exist");

            if (await userRepo.GetRole(userForLoginDto.Username) == userForLoginDto.Role)
                return BadRequest(userForLoginDto.Username + " is already " + userForLoginDto.Role);
            
            if (userForLoginDto.Role == Roles.Moderator && (await userRepo.AdminsCount()) == 1)
                return BadRequest("At least one admin needed");

            var changedRole = await userRepo.ChangeRole(userForLoginDto.Username, userForLoginDto.Role);

            if (!changedRole)
                return BadRequest("That didn't work");

            return StatusCode(201);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await roleRepo.GetRoles();

            return Ok(roles);
        }

        [HttpDelete("deletemember/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await userRepo.GetUser(id);
            if (user.Role == Roles.Admin)
                return BadRequest("Can't delete an admin");

            userRepo.Delete(user);

            if (!await authRepo.SaveAll())
                return BadRequest("That didn't work");

            return StatusCode(201);
        }
    }
}
