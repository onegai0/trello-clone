using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{

	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

	public DbSet<Project> Projects => Set<Project>();

	public DbSet<TodoList> TodoLists => Set<TodoList>();
	public DbSet<Todo> Todos => Set<Todo>();

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{

		modelBuilder.Entity<Project>(entity =>
		{
			entity.HasKey(e => e.Id);
			entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
			entity.HasMany(e => e.Lists)
				  .WithOne(e => e.Project)
				  .HasForeignKey(e => e.ProjectId)
				  .OnDelete(DeleteBehavior.Cascade);
		});

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