

using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ElectricityFilterServices
    {
        private readonly AppDbContext _context;
        private readonly DailyElectricityServices _dailyservices;

        public ElectricityFilterServices(AppDbContext context, DailyElectricityServices dailyservices)
        {
            _context = context;
            _dailyservices = dailyservices;
        }

        // return a list that displays dashboard data ? 
        // public async Task<List><Electricity>

        public async Task<PaginatedElectricity<DailyValues>> GetTableValues(int pageIndex, int pageSize)
        {
            var electricityData = await _context.DailyElectricity
            .OrderBy(d => d.Date)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

            int count = await _context.DailyElectricity.CountAsync();
            int totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedElectricity<DailyValues>(electricityData, pageIndex, totalPages);
        }
    }
}