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
    [ServiceFilter(typeof(LogUserActivity))]
    [AuthorizeRoles(Roles.Admin, Roles.Moderator)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class Edit_bikesController : ControllerBase
    {
        private readonly IBikeRepository _bikeRepo;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepo;
        public Edit_bikesController(IBikeRepository bikeRepo, IAuthRepository authRepo, IMapper mapper)
        {
            _authRepo = authRepo;
            _bikeRepo = bikeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetBikesForEdit()
        {
            var bikes = await _bikeRepo.GetBikes();

            var bikesToReturn = _mapper.Map<IEnumerable<BikeForEditListDto>>(bikes);

            return Ok(bikesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBike(int id)
        {
            var bike = await _bikeRepo.GetBike(id);

            var bikeToReturn = _mapper.Map<BikeForDetailedDto>(bike);

            return Ok(bikeToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBike(int id, BikeForUpdateDto bikeForUpdateDto)
        {
            var bikeFromRepo = await _bikeRepo.GetBike(id);

            _mapper.Map(bikeForUpdateDto, bikeFromRepo);

            if (await _bikeRepo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating bike {id} failed on save");
        }

        [HttpPost("{add-bike}")]
        public async Task<IActionResult> AddBike(BikeForUpdateDto bikeToAdd)
        {
            if (bikeToAdd.Name != null)
                bikeToAdd.Name = bikeToAdd.Name.ToLower();

            if (await _bikeRepo.BikeExists(bikeToAdd.Name))
                return BadRequest("A bike with that name already exists");

            var bikeToCreate = _mapper.Map<Bike>(bikeToAdd);
            bikeToCreate.DateAdded = DateTime.Now;

            _bikeRepo.Add(bikeToCreate);

            if (!await _bikeRepo.SaveAll())
                return BadRequest("That didn't work");

            if (_bikeRepo.GetBike(bikeToCreate.Id) == null)
                return BadRequest("That didn't work");

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBike(int id)
        {
            var bike = await _bikeRepo.GetBike(id);

            _bikeRepo.Delete(bike);

            if (!await _bikeRepo.SaveAll())
                return BadRequest("That didn't work");

            return StatusCode(201);
        }
    }
}