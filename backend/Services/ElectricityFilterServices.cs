

using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Web;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.VisualBasic;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
namespace backend.Services
{
    public class ElectricityFilterServices
    {
        private readonly AppDbContext _context;
        private readonly DailyElectricityServices _dailyservices;

        private static readonly int DEFAULT_PAGE = 1;
        private static readonly int DEFAULT_PAGE_SIZE = 10;
        public ElectricityFilterServices(AppDbContext context, DailyElectricityServices dailyservices)
        {
            _context = context;
            _dailyservices = dailyservices;
        }

        // return a list that displays dashboard data ? 
        // public async Task<List><Electricity>

        public async Task<QueryResult<DailyValues>> ApplyFilterRule(IQueryable<DailyValues> query, NameValueCollection paramCollection)
        {
            // base some constants we use in case none provided
            bool asc = true;
            int pageSize = DEFAULT_PAGE_SIZE;
            int pageIndex = DEFAULT_PAGE;
            QueryFields? sortField = null;
            foreach (var key in paramCollection.AllKeys)
            {

                var value = paramCollection[key];
                if (key == null)
                {
                    throw new ArgumentException($"Something went wrong with key missing");
                }
                if (QueryConfig.FieldSorts.TryGetValue(key, out var field))
                {
                    sortField = field;
                    continue;
                }
                if (QueryConfig.PageSorts.TryGetValue(key, out var pageField))
                {

                    switch (pageField)
                    {
                        case SortFields.OrderBy:
                            asc = !string.Equals(value, "desc", StringComparison.OrdinalIgnoreCase);
                            break;
                        case SortFields.PageIndex:
                            if (int.TryParse(value, out var page))
                                pageIndex = Math.Max(1, page);
                            break;
                        case SortFields.PageSize:
                            if (int.TryParse(value, out var size))
                                pageSize = Math.Max(1, size);
                            break;
                    }
                    continue;
                }
                throw new ArgumentException($"Unknown query parameter: {key}");
            }
            if (sortField.HasValue)
            {
                Expression<Func<DailyValues, object>> selector = sortField.Value switch
                {
                    QueryFields.Date => q => q.Date,
                    QueryFields.AveragePrice => q => q.AveragePrice,
                    QueryFields.DailyConsumption => q => q.DailyConsumption,
                    QueryFields.Production => q => q.Production,
                    QueryFields.NegativePriceLength => q => q.NegativePriceLength,
                    _ => throw new UnreachableException()
                };

                query = asc ? query.OrderBy(selector) : query.OrderByDescending(selector);
            }
            return new QueryResult<DailyValues>(query, pageSize, pageIndex);
        }
        public async Task<PaginatedElectricity<DailyValues>> GetTableValues(QueryString request)
        {
            var query = _context.DailyElectricity.AsQueryable();
            var pageIndex = DEFAULT_PAGE;
            var pageSize = DEFAULT_PAGE_SIZE;
            // has query params 
            if (request.HasValue)
            {
                var paramCollection = HttpUtility.ParseQueryString(request.Value);
                var (filteredQuery, index, size) = await ApplyFilterRule(query, paramCollection);
                query = filteredQuery;
                pageIndex = index;
                pageSize = size;
            }
            else
            {
                query = query.OrderByDescending(d => d.Date);
            }
            var electricityData = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            int count = await _context.DailyElectricity.CountAsync();
            int totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedElectricity<DailyValues>(electricityData, pageIndex, totalPages);
        }

        public async Task<List<DailyValues>> GetAllDailyDataAvailable()
        {
            return await _context.DailyElectricity.ToListAsync();
        }

    }
}