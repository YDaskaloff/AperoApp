using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;

namespace AperoApp.API.Data
{
    public interface IBikeRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Bike>> GetBikes();
         Task<Bike> GetBike(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForBike(int id);
        Task<bool> BikeExists(string bikeName);

    }
}