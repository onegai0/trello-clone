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
	public IActionResult Create([FromBody] Todo todo)
	{
		_context.Todos.Add(todo);
		_context.SaveChanges();
		return Created("", todo);
	}

	[HttpPut("{id}")]
	public IActionResult Update(int id, [FromBody] Todo todo)
	{
		var existing = _context.Todos.Find(id);
		if (existing == null) return NotFound();

		existing.Title = todo.Title;
		existing.IsFinished = todo.IsFinished;

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
