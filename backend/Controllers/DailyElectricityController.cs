

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

        [HttpGet("populate/database")]
        public async Task<ActionResult<ApiResponse>> PopulateDailyTable()
        {
            await _electricityServices.ProcessAndStoreDailyDataAsync();
            return new ApiResponse(true, "", Ok());
        }
    }
}
