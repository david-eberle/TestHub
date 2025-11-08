using Microsoft.EntityFrameworkCore;
using TestHub.Api.Data;
using TestHub.Api.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TestHubContext>(opt =>
opt.UseSqlite(builder.Configuration.GetConnectionString("TestHubConnectionString")));

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

// CORS primero
app.UseCors("AllowAll");

// Swagger solo en dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS redirection si querés
//app.UseHttpsRedirection();

// Servir SPA y assets
app.UseDefaultFiles();   // busca index.html
app.UseStaticFiles();    // sirve js, css, etc.

// Mapear controllers API
app.MapControllers();

// Fallback SPA: cualquier ruta no API devuelve index.html
app.MapFallbackToFile("index.html");

// Crear DB si no existe
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TestHubContext>();
    db.Database.EnsureCreated();
}

app.Run();