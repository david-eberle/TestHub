using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using TestHub.Api.Models;

namespace TestHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly TestHubContext _context;

        public ProjectsController(TestHubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _context.Projects
                .OrderBy(p => p.Name)
                .ToListAsync();

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.TestRuns)
                .ThenInclude(r => r.Results)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return NotFound();

            return Ok(project);
        }
    }
}
