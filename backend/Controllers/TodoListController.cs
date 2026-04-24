using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


public class CreateTodoListDto
{
	public string Order { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
	public List<Todo> Items { get; set; } = new List<Todo>();
	public int ProjectID { get; set; }
}
public class UpdateTodoListDto
{
	public string Order { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class TodoListController : ControllerBase 
{
	private readonly AppDbContext _context;

	public TodoListController(AppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		return Ok(_context.TodoLists.Include(l => l.Items).ToList());
	}

	[HttpGet("{id}")]
	public IActionResult GetById(int id)
	{
		var list = _context.TodoLists.Include(l => l.Items).FirstOrDefault(l => l.Id == id);
		if (list == null) return NotFound();
		return Ok(list);
	}

	[HttpPost]
	public IActionResult Create([FromBody] CreateTodoListDto dto)
	{
		var list = new TodoList
		{
			Order = dto.Order,
			Title = dto.Title,
			Items = dto.Items ?? new List<Todo>(),
			ProjectId = dto.ProjectID

		};
		_context.TodoLists.Add(list);
		_context.SaveChanges();
		return Created("", list);
	}

	[HttpPut("{id}")]
	public IActionResult Update(int id, [FromBody] UpdateTodoListDto dto)
	{
		var existing = _context.TodoLists.Include(l => l.Items).FirstOrDefault(l => l.Id == id);
		if (existing == null) return NotFound();

		existing.Order = dto.Order;
		existing.Title = dto.Title;

		_context.SaveChanges();
		return Ok(existing);
	}

	[HttpDelete("{id}")]
	public IActionResult Delete(int id)
	{
		var list = _context.TodoLists.Find(id);
		if (list == null) return NotFound();

		_context.TodoLists.Remove(list);
		_context.SaveChanges();

		return NoContent();
	}
}