using ExpenseRecord.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseRecord.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly CustomerDbContext _applicationDbContext;

        public CustomerService(CustomerDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public async Task<Customer> CreateAsync(Customer customer)
        {
            var id = Guid.NewGuid().ToString();

            var newCustomer = new Customer
            {
                Id = id,
                Description = customer.Description,
                Type = customer.Type,
                Amount = customer.Amount,
                Date = DateTime.Now
            };

            _applicationDbContext.Customers.Add(newCustomer);
            await _applicationDbContext.SaveChangesAsync();
            return newCustomer;
        }
        public async Task<Customer> GetById(string id)
        {
            var findCustomer = await _applicationDbContext.Customers.FindAsync(id);

            if (findCustomer == null) throw new Exception("The customer does not exist!");
            _applicationDbContext.Entry(findCustomer).State = EntityState.Detached;
            return findCustomer;
        }
        public async Task DeleteAsync(string id)
        {
            var delCcustomer = await GetById(id);
            _applicationDbContext.Customers.Remove(delCcustomer);
            await _applicationDbContext.SaveChangesAsync();

        }

        public async Task<List<Customer>> GetAllAsync()
        {
            var customers = new List<Customer>();
            customers = await _applicationDbContext.Customers.ToListAsync();
            return customers;
        }

        
    }
}
