using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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
	public IActionResult Create([FromBody] ITodo todo)
	{

		todo.CreatedAt = DateTimeOffset.UtcNow;


		_context.Todos.Add(todo);
		_context.SaveChanges();
		return Created("", todo);
	}

	[HttpPut("{id}")]
	public IActionResult Update(int id, [FromBody] ITodo todo)
	{
		var existing = _context.Todos.Find(id);
		if (existing == null) return NotFound();

		existing.Priority = todo.Priority;
		existing.Order = todo.Order;

		existing.Title = todo.Title;
		existing.Description = todo.Description;
		existing.Tag = todo.Tag;

		existing.Completed = todo.Completed;

		existing.CreatedAt = todo.CreatedAt;
		existing.DueDate = todo.DueDate;
		existing.CompletedAt = todo.CompletedAt;

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

	[HttpGet("health")]
	public IActionResult Health()
	{
		return Ok("ok");
	}
}
