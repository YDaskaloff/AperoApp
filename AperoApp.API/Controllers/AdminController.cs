using System;
using System.Collections.Generic;
using System.Security.Claims;
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
    [ServiceFilter(typeof(LogUserActivity))]
    [AuthorizeRoles(Roles.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepo;
        private readonly IRoleRepository _roleRepo;
        public AdminController(IAuthRepository authRepo, IUserRepository userRepo, IRoleRepository roleRepo, IMapper mapper)
        {
            _roleRepo = roleRepo;
            _authRepo = authRepo;
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [AuthorizeRoles(Roles.Admin, Roles.Moderator)]
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepo.GetUser(id);

            var userToReturn = _mapper.Map<UserForListDto>(user);

            return Ok(userToReturn);
        }  

        [HttpGet("members")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _authRepo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _authRepo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForListDto>(createdUser);

            return CreatedAtRoute("GetUser", new {controller = "Admin", id = createdUser.Id}, userToReturn);
        }

        [HttpPost("changerole")]
        public async Task<IActionResult> ChangeRole(UserForLoginDto userForLoginDto)
        {
            userForLoginDto.Username.ToLower();
            
            if (!await _authRepo.UserExists(userForLoginDto.Username))
                return BadRequest("User doesn't exist");

            if (await _userRepo.GetRole(userForLoginDto.Username) == userForLoginDto.Role)
                return BadRequest(userForLoginDto.Username + " is already " + userForLoginDto.Role);
            
            if (userForLoginDto.Role == Roles.Moderator && (await _userRepo.AdminsCount()) == 1)
                return BadRequest("At least one admin needed");

            var changedRole = await _userRepo.ChangeRole(userForLoginDto.Username, userForLoginDto.Role);

            if (!changedRole)
                return BadRequest("That didn't work");

            return StatusCode(201);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleRepo.GetRoles();

            return Ok(roles);
        }

        [HttpDelete("members/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userRepo.GetUser(id);
            if (user.Role == Roles.Admin)
                return BadRequest("Can't delete an admin");

            _userRepo.Delete(user);

            if (!await _authRepo.SaveAll())
                return BadRequest("That didn't work");

            return StatusCode(201);
        }

        
    }
}
