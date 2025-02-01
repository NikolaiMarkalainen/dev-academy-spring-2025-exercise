

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

    }
}
