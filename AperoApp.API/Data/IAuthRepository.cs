using System.Threading.Tasks;
using AperoApp.API.Models;

namespace AperoApp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> UpdateUser(int id, User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task<bool> SaveAll();

    }
}