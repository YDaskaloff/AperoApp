using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AperoApp.API.Controllers
{
    public class AccountController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountController(RoleManager<IdentityRole> _roleManager)
        {
            roleManager = _roleManager;
        }
    }
}