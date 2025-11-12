using System;
using System.Collections.Generic;

namespace TestHub.Api.Models
{
    public class TestRun
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        public string Source { get; set; } = "N/D";

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string TriggeredBy { get; set; } = "N/D";
        public ICollection<TestResult> Results { get; set; } = new List<TestResult>();

    }
}
