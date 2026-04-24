using System.Text.Json.Serialization;

public class TodoList
{
	public int Id { get; set; }
	public string Order { get; set; } = string.Empty;

	public string Title { get; set; } = string.Empty;

	public ICollection<Todo> Items { get; set; } = new List<Todo>();

	public int ProjectId { get; set; }

	[JsonIgnore]
	public Project? Project { get; set; }

}