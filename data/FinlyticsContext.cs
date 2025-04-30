using Microsoft.EntityFrameworkCore;
using Finlytics.Models;

public class FinlyticsContext : DbContext
{
    public FinlyticsContext(DbContextOptions<FinlyticsContext> options)
        : base(options)
    {
    }

    public DbSet<Transaction> Transactions { get; set; }
}
