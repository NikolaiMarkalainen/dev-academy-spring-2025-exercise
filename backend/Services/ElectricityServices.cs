
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

        public async Task<DailyConsumption> GetDailyElectricityConsumptionDataAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var dailyConsumption = await _context.Electricity.Where(p => p.Date.Date == utcDate).SumAsync(p => p.ConsumptionAmount) ?? 0;
            return new DailyConsumption
            {
                Consumption = dailyConsumption,
                Date = utcDate
            };
        }

        public async Task<decimal> GetDailyAverageElectricityPriceAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var averagePrice = await _context.Electricity.Where(p => p.Date.Date == utcDate).AverageAsync(p => p.HourlyPrice) ?? 0;
            return averagePrice;
        }

        public async Task<int> GetDailyNegativeElectricityPriceDurationAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var negativePriceWindows = await _context.Electricity.Where(p => p.Date.Date == utcDate)
            .Where(p => p.HourlyPrice < 0).ToListAsync();

            int consecutiveHours = 0;
            List<int> consecutiveInstanceDurations = [];
            if(negativePriceWindows.Count > 1)
            {
                for(int i = 0; i + 1 < negativePriceWindows.Count; i++)
                {
                    var currentHour = negativePriceWindows[i];
                    var nextHour = negativePriceWindows[i + 1];
                    if(nextHour.StartTime.Hour - currentHour.StartTime.Hour == 1)
                    {
                        consecutiveHours += 1;
                    }
                    else
                    {
                        consecutiveInstanceDurations.Add(consecutiveHours);
                        consecutiveHours = 0;
                    }
                }
                consecutiveInstanceDurations.Add(consecutiveHours);
            }

            int longestConsecutiveHours = consecutiveInstanceDurations.Count > 0 ? consecutiveInstanceDurations.Max() : 0;

            return longestConsecutiveHours;
        }
    }
}
