using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Helpers;
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

        public async Task<bool> ChangeRole(string username, string roleName)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == username);
            user.Role = roleName;
            return await context.SaveChangesAsync() > 0;
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<string> GetRole(string username)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == username);
            var role = user.Role;
            return role;
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

        public async Task<int> AdminsCount()
        {
            var users = await context.Users.ToListAsync();
            List<string> userRoles = new List<string>();

            foreach (User user in users)
                userRoles.Add(user.Role);

            var admins = userRoles.FindAll(r => r == Roles.Admin);

            return admins.Count;
        }        
    }
}