using AperoApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AperoApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Bike> Bikes { get; set; }
        public DbSet<Photo> Photos { get; set; }

    }
}