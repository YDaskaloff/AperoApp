using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;

namespace AperoApp.API.Data
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetRoles();
        Task<Role> GetRole(int id);
    }
}