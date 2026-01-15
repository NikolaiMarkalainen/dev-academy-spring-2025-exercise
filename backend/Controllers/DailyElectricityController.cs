

using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Linq.Expressions;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DailyElectricityController : ControllerBase
    {
        private readonly DailyElectricityServices _electricityServices;

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
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(false, "Unexpected error", null));
            }
        }
    }
}
