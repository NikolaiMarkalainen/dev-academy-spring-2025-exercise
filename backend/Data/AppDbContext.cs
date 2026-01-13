

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Electricity> Electricity { get; set; }
        public DbSet<DailyValues> DailyElectricity { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Electricity>().ToTable("electricitydata");
            modelBuilder.Entity<Electricity>().Metadata.SetIsTableExcludedFromMigrations(true);
            modelBuilder.Entity<DailyValues>().ToTable("dailyelectricity");
            /*Dont allow entries that dont contribute to data instead eat away at memory*/
            modelBuilder.Entity<DailyValues>().OwnsOne(d => d.NegativePriceLength);
        }
        public async Task RemoveNullEntriesFromElectricityData()
        {
            await Database.ExecuteSqlRawAsync($"DELETE from electricitydata WHERE productionamount IS NULL OR consumptionamount IS NULL OR hourlyprice IS NULL");
        }
        public async Task SanitizeData()
        {
            // convert KWH to MWH for consumption since its stored in a format we don't want to display or manually parse later
            // simple make it be stored in proper format, Also remove decimal points as we are not interested in super precise values for production and consumption amounts
            await Database.ExecuteSqlRawAsync($"UPDATE electricitydata SET consumptionamount = ROUND(consumptionamount / 1000, 0), productionamount = ROUND(productionamount, 0)");
        }
    }
}
