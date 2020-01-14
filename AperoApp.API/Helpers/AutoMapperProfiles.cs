using System.Linq;
using AperoApp.API.Dtos;
using AperoApp.API.Models;
using AutoMapper;

namespace AperoApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<Bike, BikeForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Bike, BikeForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));  
            CreateMap<Bike, BikeForEditListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoForDetailedDto>();       
            CreateMap<BikeForUpdateDto, Bike>();
        }
    }
}
    