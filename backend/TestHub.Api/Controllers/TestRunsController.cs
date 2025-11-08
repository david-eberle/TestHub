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
            public string ProjectName { get; set; }
            public string Source { get; set; }
            public string TriggeredBy { get; set; }
            public List<TestResult> Results { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<TestRun>> PostRun(TestRunRequest request)
        {
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
                TriggeredBy = request.TriggeredBy,
                Results = request.Results
            };

            _context.TestRuns.Add(run);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostRun), new { id = run.Id }, run);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestRun>>> GetRuns()
        {
            return await _context.TestRuns
                .Include(r => r.Project)
                .Include(r => r.Results)
                .OrderByDescending(r => r.Timestamp)
                .ToListAsync();
        }
    }
}
