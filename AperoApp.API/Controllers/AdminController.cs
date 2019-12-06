using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Data;
using AperoApp.API.Dtos;
using AperoApp.API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AperoApp.API.Controllers
{
    [AuthorizeRoles(Roles.Admin, Roles.Moderator)]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserRepository userRepo;
        private readonly IBikeRepository bikeRepo;
        private readonly IMapper mapper;
        public AdminController(IUserRepository _userRepo, IBikeRepository _bikeRepo, IMapper _mapper)
        {
            userRepo = _userRepo;
            bikeRepo = _bikeRepo;
            mapper = _mapper;
        }

        [AuthorizeRoles(Roles.Admin)]
        [HttpGet("members")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await userRepo.GetUsers();

            var usersToReturn = mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("edit-bikes")]
        public async Task<IActionResult> GetBikesForEdit()
        {
            var bikes = await bikeRepo.GetBikes();

            var bikesToReturn = mapper.Map<IEnumerable<BikeForEditListDto>>(bikes);

            return Ok(bikesToReturn);
        }

        
    }
}
