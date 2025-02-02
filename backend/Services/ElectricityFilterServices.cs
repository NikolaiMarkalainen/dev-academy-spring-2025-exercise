

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

    public async Task<IQueryable<DailyValues>> ApplyFilterRule(IQueryable<DailyValues> query, FilterOptions filter, bool ascending)
    {
        switch (filter)
        {
            case FilterOptions.Date:
                return ascending
                    ? query.OrderBy(d => d.Date)
                    : query.OrderByDescending(d => d.Date);

            case FilterOptions.AveragePrice:
                return ascending
                    ? query.OrderBy(d => d.AveragePrice)
                    : query.OrderByDescending(d => d.AveragePrice);

            case FilterOptions.DailyConsumption:
                return ascending
                    ? query.OrderBy(d => d.DailyConsumption)
                    : query.OrderByDescending(d => d.DailyConsumption);

            case FilterOptions.NegativePriceLength:
                return ascending
                    ? query.OrderBy(d => d.NegativePriceLength.Length)
                    : query.OrderByDescending(d => d.NegativePriceLength.Length);

            case FilterOptions.Production:
                return ascending
                    ? query.OrderBy(d => d.Production)
                    : query.OrderByDescending(d => d.Production);

            default:
                throw new ArgumentOutOfRangeException();
        }
    }
        public async Task<PaginatedElectricity<DailyValues>> GetTableValues(FilterRequest request)
        {
            var query = _context.DailyElectricity.AsQueryable();

            if (request.Filter != null)
            {
                query = await ApplyFilterRule(query, request.Filter.Value, request.OrderBy ?? true);
            }
            else
            {
                query = query.OrderByDescending(d => d.Date);
            }

            var electricityData = await query
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            int count = await _context.DailyElectricity.CountAsync();
            int totalPages = (int)Math.Ceiling(count / (double)request.PageSize);

            return new PaginatedElectricity<DailyValues>(electricityData, request.PageIndex, totalPages);
        }

        public async Task<List<DailyValues>> GetAllDailyDataAvailable()
        {
            return await _context.DailyElectricity.ToListAsync();    
        }

    }
}