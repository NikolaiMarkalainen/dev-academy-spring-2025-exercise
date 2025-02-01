
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Utils;
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
            return await _context.Electricity.Where(p => p.ConsumptionAmount != null).ToListAsync();
        }

        public async Task<List<Electricity>> GetDailyElictricityDataAsync(DateTime date) 
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            return await _context.Electricity.Where(p => p.Date.Date == utcDate).ToListAsync();
        }

        public async Task<decimal> GetDailyElectricityConsumptionDataAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var dailyConsumption = await _context.Electricity.Where(p => p.Date.Date == utcDate).SumAsync(p => p.ConsumptionAmount) ?? 0;
            return dailyConsumption;
        }

        public async Task<decimal> GetDailyAverageElectricityPriceAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var averagePrice = await _context.Electricity.Where(p => p.Date.Date == utcDate).AverageAsync(p => p.HourlyPrice) ?? 0;
            return averagePrice;
        }

        public async Task<ConsecutiveHours> GetDailyNegativeElectricityPriceDurationAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var negativePriceWindows = await _context.Electricity.Where(p => p.Date.Date == utcDate)
            .Where(p => p.HourlyPrice < 0).ToListAsync();

            ConsecutiveHours consecutiveData = new() { Length = 0, DayTime = [] };
            List<ConsecutiveHours> consecutiveInstanceDurations = [consecutiveData];
            if(negativePriceWindows.Count > 1)
            {
                for(int i = 0; i + 1 < negativePriceWindows.Count; i++)
                {
                    var currentHour = negativePriceWindows[i];
                    var nextHour = negativePriceWindows[i + 1];
                    if(nextHour.StartTime.Hour - currentHour.StartTime.Hour == 1)
                    {
                        consecutiveData.Length += 1;
                        consecutiveData.DayTime.Add(currentHour.StartTime.Hour);
                    }
                    else
                    {
                        consecutiveInstanceDurations.Add(consecutiveData);
                        consecutiveData = new() { Length = 0, DayTime = [] };
                    }
                }
                consecutiveInstanceDurations.Add(consecutiveData);
            }

            ConsecutiveHours longestConsecutiveData = consecutiveInstanceDurations.OrderByDescending(m => m.Length).FirstOrDefault() ?? consecutiveData;

            return longestConsecutiveData;
        }

        public async Task<AllDailyFilters> GetAllDailyFilteredDataAsync(DateTime date)
        {
            AllDailyFilters dailyData = new AllDailyFilters
            {
                Date = CommonHelpers.ConverToUTC(date),
                AveragePrice = await GetDailyAverageElectricityPriceAsync(date),
                DailyConsumption = await GetDailyElectricityConsumptionDataAsync(date),
                NegativePriceLength = await GetDailyNegativeElectricityPriceDurationAsync(date),
            };
            return dailyData;
        }
    }
}
