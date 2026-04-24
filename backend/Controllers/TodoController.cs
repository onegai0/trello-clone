using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

public class CreateTodoDto
{
	public int Priority { get; set; }
	public string Order { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string Tag { get; set; } = string.Empty;
	public bool Completed { get; set; } = false;
	public DateTimeOffset? DueDate { get; set; }
	public int TodoListId { get; set; }
}

public class UpdateTodoDto
{
	public int Priority { get; set; }
	public string Order { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string Tag { get; set; } = string.Empty;
	public bool Completed { get; set; } = false;
	public DateTimeOffset CreatedAt { get; set; }
	public DateTimeOffset? DueDate { get; set; }
}

[ApiController]
[Route("api/[controller]")]

public class TodoController : ControllerBase
{
	private readonly AppDbContext _context;

	public TodoController(AppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		return Ok(_context.Todos.ToList());
	}

	[HttpGet("{id}")]
	public IActionResult GetById(int id)
	{
		var todo = _context.Todos.Find(id);
		if (todo == null) return NotFound();
		return Ok(todo);
	}

	[HttpPost]
	public IActionResult Create([FromBody] CreateTodoDto dto)
	{
		// Valida se a lista existe antes de inserir
		var listExists = _context.TodoLists.Any(l => l.Id == dto.TodoListId);
		if (!listExists) return BadRequest("TodoList não encontrada.");

		var todo = new Todo
		{
			Priority = dto.Priority,
			Order = dto.Order,
			Title = dto.Title,
			Description = dto.Description,
			Tag = dto.Tag,
			Completed = dto.Completed,
			DueDate = dto.DueDate,
			TodoListId = dto.TodoListId,
			CreatedAt = DateTimeOffset.UtcNow,
		};

		_context.Todos.Add(todo);
		_context.SaveChanges();
		return Created("", todo);
	}
	[HttpPut("{id}")]
	public IActionResult Update(int id, [FromBody] UpdateTodoDto dto)
	{
		var existing = _context.Todos.Find(id);
		if (existing == null) return NotFound();

		existing.Priority = dto.Priority;
		existing.Order = dto.Order;
		existing.Title = dto.Title;
		existing.Description = dto.Description;
		existing.Tag = dto.Tag;
		existing.Completed = dto.Completed;
		existing.CreatedAt = dto.CreatedAt;
		existing.DueDate = dto.DueDate;
		existing.CompletedAt = dto.Completed ? DateTimeOffset.UtcNow : null; 

		_context.SaveChanges();
		return Ok(existing);
	}

	[HttpDelete("{id}")]
	public IActionResult Delete(int id)
	{
		var todo = _context.Todos.Find(id);
		if (todo == null) return NotFound();

		_context.Todos.Remove(todo);
		_context.SaveChanges();

		return NoContent();
	}
}
