using System.Collections.Generic;
using System.Threading.Tasks;
using AperoApp.API.Models;

namespace AperoApp.API.Data
{
    public interface IUserRepository
    {
         void Delete<T>(T entity) where T: class;
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<bool> ChangeRole(string username, string roleName);
         Task<string> GetRole(string username);
         Task<int> AdminsCount();
    }
}