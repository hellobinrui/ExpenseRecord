using ExpenseRecord.Data;
namespace ExpenseRecord.Services
{
    public interface ICustomerService
    {
        Task<Customer> CreateAsync(Customer customer);
        Task DeleteAsync(string id);
        Task<List<Customer>> GetAllAsync();
        Task<Customer> GetById(string id);
    }
}
