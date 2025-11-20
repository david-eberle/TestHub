using System;
namespace TestHub.Api.Models
{
    public class TestResult
    {
        public int Id { get; set; }
        public int TestRunId { get; set; }
        public int? ErrorMessageId { get; set; }
        public string Name { get; set; } = "N/D";
        public bool Passed { get; set; }
        public double Duration { get; set; }
        public string LogUrl { get; set; } = "N/D";
        public ErrorMessage? ErrorMessage { get; set; }
        public TestRun? TestRun { get; set; }
    }
}