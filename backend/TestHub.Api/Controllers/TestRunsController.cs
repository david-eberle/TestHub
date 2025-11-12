using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using TestHub.Api.Models;

namespace TestHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestRunsController : ControllerBase
    {
        private readonly TestHubContext _context;

        public TestRunsController(TestHubContext context)
        {
            _context = context;
        }

        public class TestRunRequest
        {
            public string ProjectName { get; set; } = "N/D";
            public string Source { get; set; } = "N/D";
            public string TriggeredBy { get; set; } = "N/D";
            public DateTime? Timestamp { get; set; }
            public required List<TestResult> Results { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<TestRun>> PostRun([FromBody] TestRunRequest request)
        {
            if (!Request.Headers.TryGetValue("X-Auth-Token", out var receivedToken))
                return Unauthorized("Missing token");

            var expectedToken = Environment.GetEnvironmentVariable("TESTHUB_TOKEN");

            if (string.IsNullOrEmpty(expectedToken))
                return StatusCode(500, "Server token not configured");

            if (receivedToken != expectedToken)
                return Unauthorized("Invalid token");

            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Name == request.ProjectName);

            if (project == null)
            {
                project = new Project { Name = request.ProjectName };
                _context.Projects.Add(project);
                await _context.SaveChangesAsync();
            }

            var run = new TestRun
            {
                ProjectId = project.Id,
                Source = request.Source,
                Timestamp = request.Timestamp ?? DateTime.UtcNow,
                TriggeredBy = request.TriggeredBy,
                Results = request.Results
            };

            _context.TestRuns.Add(run);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostRun), new { id = run.Id }, run);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestRun>>> GetRuns([FromQuery] int? projectId)
        {
            var query = _context.TestRuns
                .Include(r => r.Project)
                .Include(r => r.Results)
                .AsQueryable();

            if (projectId.HasValue)
                query = query.Where(r => r.ProjectId == projectId.Value);

            var runs = await query
                .OrderByDescending(r => r.Timestamp)
                .ToListAsync();

            return runs;
        }
    }
}
