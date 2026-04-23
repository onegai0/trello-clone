public class TodoList
{
	public int Id { get; set; }
	public int Order { get; set; }

	public string Title { get; set; } = string.Empty;

	public ICollection<Todo> Items { get; set; } = new List<Todo>();

}