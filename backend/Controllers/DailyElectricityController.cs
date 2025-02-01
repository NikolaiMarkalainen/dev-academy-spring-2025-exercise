

using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DailyElectricityController : ControllerBase
    {
        private readonly DailyElectricityServices _electricityServices;

        public DailyElectricityController(DailyElectricityServices electricityServices)
        {
            _electricityServices = electricityServices;
        }

        [HttpGet("data")]
        public async Task<ActionResult<ApiResponse>> GetAllElectricityData()
        {
            var result = await _electricityServices.GetAllElectricityDataAsync();
            return new ApiResponse(true, null, result);
        }
        [HttpGet()]
        public async Task<ActionResult<ApiResponse>> GetDailyElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyElictricityDataAsync(date.Date);
            return new ApiResponse(true, null, result);
        }

        [HttpGet("consumption")]
        public async Task<ActionResult<ApiResponse>> GetDailyConsumptionElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyElectricityConsumptionDataAsync(date);
            return new ApiResponse(true, null, result);
        }

        [HttpGet("price")]
        public async Task<ActionResult<ApiResponse>> GetDailyPriceElectricityData(DateTime date)
        {
            var result = await _electricityServices.GetDailyAverageElectricityPriceAsync(date);
            return new ApiResponse(true, null, result);
        }

        [HttpGet("negative")]
        public async Task<ActionResult<ApiResponse>> GetDailyNegativePriceWindow(DateTime date)
        {
            var result = await _electricityServices.GetDailyNegativeElectricityPriceDurationAsync(date);
            return new ApiResponse(true, null, result);
        }

        [HttpGet("filters")]
        public async Task<ActionResult<ApiResponse>> GetAllDailyFilteredData(DateTime date)
        {
            var result = await _electricityServices.GetAllDailyFilteredDataAsync(date);
            return new ApiResponse(true, null, result);
        }
        [HttpGet("populate/database")]
        public async Task<ActionResult<ApiResponse>> PopulateDailyTable()
        {
            await _electricityServices.ProcessAndStoreDailyDataAsync();
            return new ApiResponse(true, null, Ok());
        }
    }
}
