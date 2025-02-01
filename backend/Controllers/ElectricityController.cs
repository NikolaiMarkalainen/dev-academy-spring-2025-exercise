

using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ElectricityController : ControllerBase
    {
        private readonly ElectricityServices _electricityServices;

        public ElectricityController(ElectricityServices electricityServices)
        {
            _electricityServices = electricityServices;
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetAllElectricityData()
        {
            var result = await _electricityServices.GetAllElectricityDataAsync();
            return Ok(result);
        }
        [HttpGet("daily")]
        public async Task<IActionResult> GetDailyElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyElictricityDataAsync(date.Date);
            return Ok(result);
        }

        [HttpGet("daily/consumption")]
        public async Task<IActionResult> GetDailyConsumptionElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyElectricityConsumptionDataAsync(date);
            return Ok(result);
        }

        [HttpGet("daily/price")]
        public async Task<IActionResult> GetDailyPriceElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyAverageElectricityPriceAsync(date);
            return Ok(new { dailyPrice = result });
        }

        [HttpGet("daily/negative")]
        public async Task<IActionResult> GetDailyNegativePriceWindow(DateTime date)
        {
            var result = await _electricityServices.GetDailyNegativeElectricityPriceDurationAsync(date);
            return Ok(result);
        }
    }
}
