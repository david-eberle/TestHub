using Microsoft.EntityFrameworkCore;
using TestHub.Api.Models;

namespace TestHub.Api.Data
{
    public class TestHubContext : DbContext
    {
        public TestHubContext(DbContextOptions<TestHubContext> options) : base(options)
        {
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TestRun> TestRuns { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
    }
}