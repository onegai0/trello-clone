using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


public class CreateProjectDto
{
	public string Title { get; set; } = string.Empty;
	public List<TodoList> Lists { get; set; } = new List<TodoList>();
}
public class UpdateProjectDto
{
	public string Title { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
	private readonly AppDbContext _context;

	public ProjectController(AppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	public IActionResult GetAll()
	{
		return Ok(_context.Projects
			.Include(p => p.Lists)
			.ThenInclude(l => l.Items)
			.ToList());
	}

	[HttpGet("{id}")]
	public IActionResult GetById(int id)
	{
		var project = _context.Projects
			.Include(p => p.Lists)
				.ThenInclude(l => l.Items)
			.FirstOrDefault(p => p.Id == id);
		if (project == null) return NotFound();
		return Ok(project);
	}
	[HttpPost]
	public IActionResult Create([FromBody] CreateProjectDto dto)
	{
		var project = new Project
		{
			Title = dto.Title,
			Lists = dto.Lists ?? new List<TodoList>()
		};
		_context.Projects.Add(project);
		_context.SaveChanges();
		return Created("", project);
	}

	[HttpPut("{id}")]
	public IActionResult Update(int id, [FromBody] UpdateProjectDto dto)
	{
		var existing = _context.Projects.Include(l => l.Lists).FirstOrDefault(l => l.Id == id);
		if (existing == null) return NotFound();

		existing.Title = dto.Title;

		_context.SaveChanges();
		return Ok(existing);
	}

	[HttpDelete("{id}")]
	public IActionResult Delete(int id)
	{
		var project = _context.Projects.Find(id);
		if (project == null) return NotFound();

		_context.Projects.Remove(project);
		_context.SaveChanges();

		return NoContent();
	}
}