

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
        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetHourlyData()
        {
            try
            {
                var url = Request.QueryString;
                var data = await _electricityServices.GetDailyElictricityDataAsync(url);
                return new ApiResponse(true, "", data);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ApiResponse(false, ex.Message, null));
            }
            catch (Exception Exception)
            {
                return StatusCode(500, new ApiResponse(false, Exception.ToString(), null));

            }
        }
    }
}
