using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
	public DbSet<ITodo> Todos { get; set; }

	public AppDbContext(DbContextOptions<AppDbContext> options)
		: base(options) { }
}