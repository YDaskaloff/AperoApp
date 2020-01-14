using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AperoApp.API.Data;
using AperoApp.API.Dtos;
using AperoApp.API.Helpers;
using AperoApp.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AperoApp.API.Controllers
{
    [AuthorizeRoles(Roles.Admin, Roles.Moderator)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class Edit_bikesController : ControllerBase
    {
        private readonly IBikeRepository bikeRepo;
        private readonly IMapper mapper;
        private readonly IAuthRepository authRepo;
        public Edit_bikesController(IBikeRepository _bikeRepo, IAuthRepository _authRepo, IMapper _mapper)
        {
            authRepo = _authRepo;
            bikeRepo = _bikeRepo;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetBikesForEdit()
        {
            var bikes = await bikeRepo.GetBikes();

            var bikesToReturn = mapper.Map<IEnumerable<BikeForEditListDto>>(bikes);

            return Ok(bikesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBike(int id)
        {
            var bike = await bikeRepo.GetBike(id);

            var bikeToReturn = mapper.Map<BikeForDetailedDto>(bike);

            return Ok(bikeToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBike(int id, BikeForUpdateDto bikeForUpdateDto)
        {
            var bikeFromRepo = await bikeRepo.GetBike(id);

            mapper.Map(bikeForUpdateDto, bikeFromRepo);

            if (await bikeRepo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating bike {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBike(int id)
        {
            var bike = await bikeRepo.GetBike(id);

            bikeRepo.Delete(bike);

            if (!await authRepo.SaveAll())
                return BadRequest("That didn't work");

            return StatusCode(201);
        }
    }
}