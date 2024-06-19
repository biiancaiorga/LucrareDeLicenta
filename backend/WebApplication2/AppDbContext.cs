using Microsoft.EntityFrameworkCore;
using WebApplication2.Menu;
using WebApplication2.Order;
using WebApplication2.User;

namespace WebApplication2;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options){}

    public DbSet<UserModel> users { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<OrderItemModel> OrderItems { get; set; }
    
}