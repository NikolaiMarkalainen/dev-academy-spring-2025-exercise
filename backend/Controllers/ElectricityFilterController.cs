

using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Web;
using System.Text;
using System.Buffers;
using Microsoft.AspNetCore.Http.Extensions;

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
            var url = Request.QueryString;
            var dailyList = await _filterServices.GetTableValues(url);
            return new ApiResponse(true, "", dailyList);
        }
    }
}