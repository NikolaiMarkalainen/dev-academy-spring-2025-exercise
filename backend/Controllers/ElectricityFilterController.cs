

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

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> GetDailyElectricity(FilterRequest request)
        {
            var dailyList = await _filterServices.GetTableValues(request);
            return new ApiResponse(true, null, dailyList);
        }
    }
}