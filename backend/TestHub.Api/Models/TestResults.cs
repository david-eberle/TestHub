using System;
namespace TestHub.Api.Models
{
    public class TestResult
    {
        public int Id { get; set; }
        public int TestRunId { get; set; }
        public string Name { get; set; }
        public bool Passed { get; set; }
        public double Duration { get; set; }
        public string LogUrl { get; set; }
        public TestRun TestRun
        {
            get; set;

        }
    }
}