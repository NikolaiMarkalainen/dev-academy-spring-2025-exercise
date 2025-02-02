using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment;

builder.Configuration.SetBasePath
    (Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();


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

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var dailyElectricityServices = scope.ServiceProvider.GetRequiredService<DailyElectricityServices>();
    dbContext.Database.Migrate();
    dbContext.RemoveNullEntriesFromElectricityData();
    var hasDailyElectricity = dbContext.DailyElectricity.Any();
    if(!hasDailyElectricity)
    {
        await dailyElectricityServices.ProcessAndStoreDailyDataAsync();
    }
}

app.UseRouting();
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();




app.Run();
