

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
            // sent enum and enum will tell what to 
            // Start with the query
            var query = _context.DailyElectricity.AsQueryable();

            // Apply the filter rule based on the provided request.Filter
            if (request.Filter != null)
            {
                query = await ApplyFilterRule(query, request.Filter.Value, request.OrderBy ?? true);
            }
            else
            {
                // If no filter provided, default to ordering by Date (descending)
                query = query.OrderByDescending(d => d.Date);
            }

            // Apply pagination
            var electricityData = await query
                .Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            // Get the total count for pagination
            int count = await _context.DailyElectricity.CountAsync();
            int totalPages = (int)Math.Ceiling(count / (double)request.PageSize);

            return new PaginatedElectricity<DailyValues>(electricityData, request.PageIndex, totalPages);
        }

        // public async Task<PaginatedElectricity<DailyValues>> FilterByDate(int pageIndex, int pageSize, bool ascending)
        // {
        //     var electricityData =
        //     ascending ? await _context.DailyElectricity
        //     .OrderByDescending(d => d.Date)
        //     .Skip((pageIndex - 1) * pageSize)
        //     .Take(pageSize)
        //     .ToListAsync()
        //     : await _context.DailyElectricity
        //     .OrderBy(d => d.Date)
        //     .Skip((pageIndex - 1) * pageSize)
        //     .Take(pageSize)
        //     .ToListAsync();

        //     int count = await _context.DailyElectricity.CountAsync();
        //     int totalPages = (int)Math.Ceiling(count / (double)pageSize);

        //     return new PaginatedElectricity<DailyValues>(electricityData, pageIndex, totalPages);
        // }
    }
}