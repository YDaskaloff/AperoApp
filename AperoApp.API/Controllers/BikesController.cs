using System.Collections;
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
    [ServiceFilter(typeof(LogUserActivity))]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private readonly IBikeRepository repo;
        private readonly IMapper mapper;
        public BikesController(IBikeRepository _repo, IMapper _mapper)
        {
            mapper = _mapper;
            repo = _repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetBikes()
        {
            var bikes = await repo.GetBikes();

            var bikesToReturn = mapper.Map<IEnumerable<BikeForListDto>>(bikes);

            return Ok(bikesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBike(int id)
        {
            var bike = await repo.GetBike(id);

            var bikeToReturn = mapper.Map<BikeForDetailedDto>(bike);

            return Ok(bikeToReturn);
        }        
    }
}
