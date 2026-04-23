using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{

	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

	public DbSet<TodoList> TodoLists => Set<TodoList>();
	public DbSet<Todo> Todos => Set<Todo>();

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<TodoList>(entity =>
		{
			entity.HasKey(e => e.Id);
			entity.Property(e => e.Title).IsRequired().HasMaxLength(200);

			entity.HasMany(e => e.Items)          
				  .WithOne(e => e.TodoList)        
				  .HasForeignKey(e => e.TodoListId)
				  .OnDelete(DeleteBehavior.Cascade);
		});
	}
}