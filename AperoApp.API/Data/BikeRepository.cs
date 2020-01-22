using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AperoApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AperoApp.API.Data
{
    public class BikeRepository : IBikeRepository
    {
        private readonly DataContext _context;
        public BikeRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
        }

        public async Task<bool> BikeExists(string bikeName)
        {
            if (await _context.Bikes.AnyAsync(x => x.Name == bikeName))
                return true;
            return false;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Bike> GetBike(int id)
        {
            var bike = await _context.Bikes.Include(p => p.Photos).FirstOrDefaultAsync(b => b.Id == id);

            return bike;
        }

        public async Task<IEnumerable<Bike>> GetBikes()
        {
            var bikes = await _context.Bikes.Include(p => p.Photos).ToListAsync();

            return bikes;
        }

        public async Task<Photo> GetMainPhotoForBike(int bikeId)
        {
            return await _context.Photos
                .Where(b => b.BikeId == bikeId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }        

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}