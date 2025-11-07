using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using TestHub.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TestHubContext>(opt =>
opt.UseSqlite(builder.Configuration.GetConnectionString("TestHubConnectionString")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TestHubContext>();
    db.Database.EnsureCreated();
}

app.MapGet("/", () => "TestHub API is running 🚀");

app.Run();
