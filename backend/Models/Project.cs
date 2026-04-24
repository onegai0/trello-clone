public class Project
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public ICollection<TodoList> Lists { get; set; } = new List<TodoList>();

}