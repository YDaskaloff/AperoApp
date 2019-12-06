using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AperoApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        public UserRepository(DataContext _context)
        {
            context = _context;
        }
        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var bike = await context.Users.FirstOrDefaultAsync(b => b.Id == id);

            return bike;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}