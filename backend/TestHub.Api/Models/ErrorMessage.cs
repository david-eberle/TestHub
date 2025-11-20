using System;
using System.Collections.Generic;

namespace TestHub.Api.Models
{
    public class ErrorMessage
    {
        public int Id { get; set; }
        public string Description { get; set; } = "N/D";
        public ICollection<TestResult> TestResults { get; set; } = new List<TestResult>();

    }
}
