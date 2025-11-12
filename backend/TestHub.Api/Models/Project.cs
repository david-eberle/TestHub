using System.Collections.Generic;

namespace TestHub.Api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = "N/D";

        public ICollection<TestRun> TestRuns { get; set; } = new List<TestRun>();
    }
}
