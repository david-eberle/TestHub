using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var cs = builder.Configuration.GetConnectionString("TestHubConnectionString");

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<TestHubContext>(opt => opt.UseSqlite(cs));
}
else
{
    builder.Services.AddDbContext<TestHubContext>(opt => opt.UseSqlServer(cs));
}

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

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

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TestHubContext>();
    db.Database.Migrate();
}

app.Run();
