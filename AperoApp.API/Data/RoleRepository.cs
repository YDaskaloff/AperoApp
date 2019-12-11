using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AperoApp.API.Data
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext context;
        public RoleRepository(DataContext _context)
        {
            context = _context;
        }

        public async Task<Role> GetRole(int id)
        {
            var role = await context.Roles.FirstOrDefaultAsync(r => r.Id == id);

            return role;
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await context.Roles.ToListAsync();

            return roles;
        }
    }
}