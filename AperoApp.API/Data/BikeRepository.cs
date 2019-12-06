using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AperoApp.API.Data
{
    public class BikeRepository : IBikeRepository
    {
        private readonly DataContext context;
        public BikeRepository(DataContext _context)
        {
            context = _context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<Bike> GetBike(int id)
        {
            var bike = await context.Bikes.Include(p => p.Photos).FirstOrDefaultAsync(b => b.Id == id);

            return bike;
        }

        public async Task<IEnumerable<Bike>> GetBikes()
        {
            var bikes = await context.Bikes.Include(p => p.Photos).ToListAsync();

            return bikes;
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}