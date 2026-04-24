using System.Text.Json.Serialization;

public class Todo
{
	public int Id { get; set; }
	public int Priority { get; set; }
	public string Order { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string Tag { get; set; } = string.Empty;
	public bool Completed { get; set; } = false;
	public DateTimeOffset CreatedAt { get; set; }
	public DateTimeOffset? DueDate { get; set; }
	public DateTimeOffset? CompletedAt { get; set; }

	public int TodoListId { get; set; }
	[JsonIgnore]
	public TodoList? TodoList { get; set; } 
}