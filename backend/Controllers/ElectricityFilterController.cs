

using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FilterElectricityController : ControllerBase
    {
        private readonly ElectricityFilterServices _filterServices;

        public FilterElectricityController(ElectricityFilterServices filterServices)
        {
            _filterServices = filterServices;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetDailyElectricity(int pageIndex = 1, int pageSize = 15)
        {
            var dailyList = await _filterServices.GetTableValues(pageIndex, pageSize);
            return new ApiResponse(true, null, dailyList);
        }
    }
}