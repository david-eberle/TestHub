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
                    Duration = Math.Round(res.Duration / 60.0, 2),
                    r.Source
                }))
                .OrderBy(x => x.Passed)
                .ToList();


            var allLastDayResults = lastDayRuns.SelectMany(r => r.Results).ToList();

            var totalTests = allLastDayResults.Count;
            var passedTests = allLastDayResults.Count(r => r.Passed);
            var totalMinutes = allLastDayResults.Sum(r => r.Duration) / 60.0;

            var lastDaySummary = new
            {
                TotalTests = totalTests,
                SuccessRate = totalTests > 0 ? Math.Round(passedTests * 100.0 / totalTests, 2) : 0,
                TotalMinutes = Math.Round(totalMinutes, 2)
            };

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
                .OrderBy(g => g.Date)
                .ToList();


            var avgDuration7Days = recentRuns
                .GroupBy(r => new { Date = r.Timestamp.Date, r.Source })
                .Select(g => new
                {
                    g.Key.Date,
                    g.Key.Source,
                    AvgDuration = g.SelectMany(r => r.Results).Any()
                        ? Math.Round(g.SelectMany(r => r.Results).Average(r => r.Duration), 2) / 60.0
                        : 0
                })
                .OrderBy(g => g.Date)
                .ToList();

            var topFailedTests = recentRuns
                .SelectMany(r => r.Results)
                .GroupBy(r => r.Name)
                .Select(g => new
                {
                    TestName = g.Key,
                    TotalRuns = g.Count(),
                    FailCount = g.Count(r => !r.Passed),
                    FailRate = g.Count() > 0
                        ? Math.Round(g.Count(r => !r.Passed) * 100.0 / g.Count(), 2)
                        : 0
                })
                .OrderByDescending(g => g.FailCount)
                .Take(3)
                .ToList();

            var topSlowestTests = recentRuns
                            .SelectMany(r => r.Results)
                            .GroupBy(r => r.Name)
                            .Select(g => new
                            {
                                TestName = g.Key,
                                TotalRuns = g.Count(),
                                AvgDuration = Math.Round(g.Average(r => r.Duration) / 60.0, 2)
                            })
                            .OrderByDescending(g => g.AvgDuration)
                            .Take(3)
                            .ToList();

            return Ok(new
            {
                LastDayTests = lastDayTests,
                LastDaySummary = lastDaySummary,
                SuccessRateBySource = successRateBySource,
                SuccessRate7Days = successRate7Days,
                AvgDuration7Days = avgDuration7Days,
                TopFailedTests = topFailedTests,
                TopSlowestTests = topSlowestTests
            });
        }
    }
}
