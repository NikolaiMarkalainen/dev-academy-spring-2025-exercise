

using Microsoft.EntityFrameworkCore;


namespace backend.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        public DbSet<Electricity> Electricity { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Electricity>().ToTable("electricitydata");

            /*Dont allow entries that dont contribute to data instead eat away at memory*/
            modelBuilder.Entity<Electricity>()
            .Property(e => e.HourlyPrice)
            .IsRequired();

            modelBuilder.Entity<Electricity>()
            .Property(e => e.ProductionAmount)
            .IsRequired();

            modelBuilder.Entity<Electricity>()
            .Property(e => e.HourlyPrice)
            .IsRequired();
        }
    }
}
