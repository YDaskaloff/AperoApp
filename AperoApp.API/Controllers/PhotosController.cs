using System.Linq;
using System.Threading.Tasks;
using AperoApp.API.Data;
using AperoApp.API.Dtos;
using AperoApp.API.Helpers;
using AperoApp.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AperoApp.API.Controllers
{
    [AuthorizeRoles(Roles.Admin, Roles.Moderator)]
    [Route("api/admin/edit_bikes/{bikeId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IBikeRepository _bikeRepo;

        public PhotosController(IBikeRepository bikeRepo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _bikeRepo = bikeRepo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _bikeRepo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForBike(int bikeId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var bikeFromRepo = await _bikeRepo.GetBike(bikeId);
            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Folder = "AperoApp"
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!bikeFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            bikeFromRepo.Photos.Add(photo);

            if (await _bikeRepo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new {bikeId = bikeId, id = photo.Id}, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int bikeId, int id)
        {
            var bike = await _bikeRepo.GetBike(bikeId);

            if (!bike.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _bikeRepo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            var currentMainPhoto = await _bikeRepo.GetMainPhotoForBike(bikeId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _bikeRepo.SaveAll())
                return NoContent();
            
            return BadRequest("Could not set photo to main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int bikeId, int id) 
        {
            var bike = await _bikeRepo.GetBike(bikeId);

            if (!bike.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _bikeRepo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("You cannot delete your main photo");

            if (photoFromRepo.PublicId != null) 
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok") {
                    _bikeRepo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicId == null)            
                _bikeRepo.Delete(photoFromRepo);       

            if (await _bikeRepo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete the photo");
        }
    }
}