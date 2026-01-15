

using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FilterElectricityController(ElectricityFilterServices filterServices) : ControllerBase
    {
        private readonly ElectricityFilterServices _filterServices = filterServices;

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetDailyElectricity()
        {

            try
            {
                var url = Request.QueryString;
                var dailyList = await _filterServices.GetTableValues(url);
                return new ApiResponse(true, "", dailyList);
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