
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services
{
    public class ElectricityServices
    {
        private readonly AppDbContext _context;

        public ElectricityServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Electricity>> GetAllElectricityDataAsync()
        {
            return await _context.Electricity.ToListAsync();
        }

    }
}
