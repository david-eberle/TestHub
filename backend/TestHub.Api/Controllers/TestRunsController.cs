using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using TestHub.Api.Models;

namespace TestHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestRunsController : ControllerBase
{
    private readonly TestHubContext _context;

    public TestRunsController(TestHubContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestRun>>> GetRuns()
    {
        return await _context.TestRuns.Include(r => r.Results).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<TestRun>> PostRun(TestRun run)
    {
        _context.TestRuns.Add(run);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRuns), new { id = run.Id }, run);
    }
}
