using Microsoft.AspNetCore.Mvc;
using ExpenseRecord.Services;
using ExpenseRecord.Data;
namespace ExpenseRecord.Controllers
{

    [ApiController]
    [Route("api/v1/customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> GetCustomerByIdAsync([FromRoute] string id)
        {
            try
            {
                var customer = await _customerService.GetById(id);
                return new ObjectResult(customer);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetCustomersAsync()
        {
            var customers = await _customerService.GetAllAsync();
            return new ObjectResult(customers);

        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateCustomerAsync(Customer customer)
        {
            try
            {
                var id = await _customerService.CreateAsync(customer);
                return Created($"api/v1/customers/{id}", id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteCustomerAsync([FromRoute] string id)
        {
            try
            {
                await _customerService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }

    }
}