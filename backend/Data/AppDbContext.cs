using Microsoft.EntityFrameworkCore;
using Finlytics_Csharp.Models;

namespace Finlytics_Csharp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<StockAction> StockActions { get; set; }
    }
}
