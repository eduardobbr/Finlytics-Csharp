using Finlytics_Csharp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();          

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql("server=localhost;database=FinlyticsDb;user=root;password=rootroot",
        new MySqlServerVersion(new Version(8, 0, 36))));

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();   
app.UseSwaggerUI();

app.UseAuthorization();
app.MapControllers();

app.Run();
