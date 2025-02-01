using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var logger = LoggerFactory.Create(logging => logging.AddConsole()).CreateLogger<Program>();

logger.LogInformation(connectionString);
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddScoped<DailyElectricityServices>();
builder.Services.AddScoped<ElectricityFilterServices>();

var app = builder.Build();


app.UseRouting();
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();




app.Run();
