

using Microsoft.EntityFrameworkCore;


namespace backend.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        public DbSet<Electricity> Electricity { get; set; }
        public DbSet<DailyValues> DailyElectricity { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Electricity>().ToTable("electricitydata");
            modelBuilder.Entity<DailyValues>().ToTable("dailyelectricity");
            /*Dont allow entries that dont contribute to data instead eat away at memory*/
            
            modelBuilder.Entity<DailyValues>().OwnsOne(d => d.NegativePriceLength);
        }
    }
}
