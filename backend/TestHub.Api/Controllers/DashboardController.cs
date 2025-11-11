using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;

namespace TestHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly TestHubContext _context;

        public DashboardController(TestHubContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard([FromQuery] int days = 7, [FromQuery] int? projectId = null)
        {
            var fromDate = DateTime.UtcNow.Date.AddDays(-days + 1);

            var recentRunsQuery = _context.TestRuns
                .Include(r => r.Results)
                .Where(r => r.Timestamp.Date >= fromDate);

            if (projectId.HasValue)
                recentRunsQuery = recentRunsQuery.Where(r => r.ProjectId == projectId.Value);

            var recentRuns = await recentRunsQuery.ToListAsync();

            var lastDay = DateTime.UtcNow.Date;
            var lastDayRuns = recentRuns
                .Where(r => r.Timestamp.Date == lastDay)
                .ToList();

            var lastDayTests = lastDayRuns
                .SelectMany(r => r.Results.Select(res => new
                {
                    res.Name,
                    res.Passed,
                    res.Duration,
                    r.Source
                }))
                .OrderByDescending(x => x.Passed)
                .ToList();

            var successRateBySource = lastDayRuns
                .GroupBy(r => r.Source)
                .Select(g => new
                {
                    Source = g.Key,
                    SuccessRate = g.SelectMany(r => r.Results).Any()
                        ? Math.Round(
                            g.SelectMany(r => r.Results).Count(r => r.Passed) * 100.0 /
                            g.SelectMany(r => r.Results).Count(), 2)
                        : 0
                })
                .ToList();

            var successRate7Days = recentRuns
                .GroupBy(r => new { Date = r.Timestamp.Date, r.Source })
                .Select(g => new
                {
                    g.Key.Date,
                    g.Key.Source,
                    SuccessRate = g.SelectMany(r => r.Results).Any()
                        ? Math.Round(
                            g.SelectMany(r => r.Results).Count(r => r.Passed) * 100.0 /
                            g.SelectMany(r => r.Results).Count(), 2)
                        : 0
                })
                .ToList();

            var avgDuration7Days = recentRuns
                .GroupBy(r => new { Date = r.Timestamp.Date, r.Source })
                .Select(g => new
                {
                    g.Key.Date,
                    g.Key.Source,
                    AvgDuration = g.SelectMany(r => r.Results).Any()
                        ? Math.Round(g.SelectMany(r => r.Results).Average(r => r.Duration), 2)
                        : 0
                })
                .ToList();

            var topFailedTests = recentRuns
                .SelectMany(r => r.Results)
                .Where(r => !r.Passed)
                .GroupBy(r => r.Name)
                .Select(g => new { TestName = g.Key, FailCount = g.Count() })
                .OrderByDescending(g => g.FailCount)
                .Take(10)
                .ToList();

            var allResults = recentRuns.SelectMany(r => r.Results).ToList();
            double globalSuccessRate = allResults.Any()
                ? Math.Round(allResults.Count(r => r.Passed) * 100.0 / allResults.Count(), 2)
                : 0;

            return Ok(new
            {
                LastDayTests = lastDayTests,
                SuccessRateBySource = successRateBySource,
                SuccessRate7Days = successRate7Days,
                AvgDuration7Days = avgDuration7Days,
                TopFailedTests = topFailedTests,
                GlobalSuccessRate = globalSuccessRate
            });
        }
    }
}
