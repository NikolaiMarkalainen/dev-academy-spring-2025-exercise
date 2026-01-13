
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Utils;
using System.Web;
namespace backend.Services
{
    public class DailyElectricityServices
    {
        private readonly AppDbContext _context;
        public DailyElectricityServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Electricity>> GetAllElectricityDataAsync()
        {
            return await _context.Electricity.ToListAsync();
        }

        public async Task<List<Electricity>> GetDailyElictricityDataAsync(QueryString query)
        {
            DateTime date = DateTime.MinValue;
            bool dateFound = false;
            if (!query.HasValue)
            {
                throw new ArgumentException("Query missing a value");
            }
            var strings = HttpUtility.ParseQueryString(query.Value);
            foreach (var key in strings.AllKeys)
            {
                var value = strings[key];
                if (key == null)
                {
                    throw new ArgumentException("Query key is null");
                }
                if (key.Equals("date", StringComparison.OrdinalIgnoreCase))
                {
                    if (DateTime.TryParse(value, out DateTime parsedDate))
                    {
                        date = parsedDate;
                        dateFound = true;
                    }
                    else
                    {
                        throw new ArgumentException($"Invalid format for date: {value}");
                    }
                }
            }
            if (!dateFound) throw new ArgumentException("Date parameter not given cant continue");
            var utcDate = CommonHelpers.ConverToUTC(date);
            return await _context.Electricity.Where(p => p.Date.Date == utcDate).ToListAsync();
        }
        //EVERYTHING BELOW THIS LINE IS REMOVEABLE not exactly sure why this was built initially but maybe the seed function will come to use
        // in case data base wont be able to update itself properly
        public async Task<decimal> GetDailyElectricityConsumptionDataAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var dailyConsumption = await _context.Electricity.Where(p => p.Date.Date == utcDate).SumAsync(p => p.ConsumptionAmount);
            return dailyConsumption;
        }

        public async Task<decimal> GetDailyAverageElectricityPriceAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var averagePrice = await _context.Electricity.Where(p => p.Date.Date == utcDate).AverageAsync(p => p.HourlyPrice);
            return averagePrice;
        }

        public async Task<ConsecutiveHours> GetDailyNegativeElectricityPriceDurationAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            var negativePriceWindows = await _context.Electricity.Where(p => p.Date.Date == utcDate)
            .Where(p => p.HourlyPrice < 0).ToListAsync();

            ConsecutiveHours consecutiveData = new() { Length = 0, DayTime = [] };
            List<ConsecutiveHours> consecutiveInstanceDurations = [consecutiveData];
            if (negativePriceWindows.Count > 1)
            {
                for (int i = 0; i + 1 < negativePriceWindows.Count; i++)
                {
                    var currentHour = negativePriceWindows[i];
                    var nextHour = negativePriceWindows[i + 1];
                    if (nextHour.StartTime.Hour - currentHour.StartTime.Hour == 1)
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

        public async Task<decimal> GetDailyProductionAmountAsync(DateTime date)
        {
            var utcDate = CommonHelpers.ConverToUTC(date);
            return await _context.Electricity.Where(p => p.Date.Date == utcDate).SumAsync(p => p.ProductionAmount);
        }
        public async Task<DailyValues> GetAllDailyFilteredDataAsync(DateTime date)
        {
            DailyValues dailyData = new DailyValues
            {
                Date = CommonHelpers.ConverToUTC(date),
                AveragePrice = await GetDailyAverageElectricityPriceAsync(date),
                DailyConsumption = await GetDailyElectricityConsumptionDataAsync(date),
                NegativePriceLength = await GetDailyNegativeElectricityPriceDurationAsync(date),
                Production = await GetDailyProductionAmountAsync(date)
            };
            return dailyData;
        }

        public async Task ProcessAndStoreDailyDataAsync()
        {
            var test = await _context.Electricity.ToListAsync();
            var allElectricityData = await _context.Electricity.GroupBy(e => e.Date).ToListAsync();

            var filteredDailyData = new List<DailyValues>();

            foreach (var item in allElectricityData)
            {
                filteredDailyData.Add(new DailyValues
                {
                    Date = CommonHelpers.ConverToUTC(item.Key),
                    AveragePrice = await GetDailyAverageElectricityPriceAsync(item.Key),
                    DailyConsumption = await GetDailyElectricityConsumptionDataAsync(item.Key),
                    NegativePriceLength = await GetDailyNegativeElectricityPriceDurationAsync(item.Key),
                    Production = await GetDailyProductionAmountAsync(item.Key)
                });
            }
            await _context.DailyElectricity.AddRangeAsync(filteredDailyData);
            await _context.SaveChangesAsync();
        }
    }
}
