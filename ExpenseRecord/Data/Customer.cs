namespace ExpenseRecord.Data
{
    public class Customer
    {
        public string? Id { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public double Amount { get; set; }
        public DateTime? Date { get; set; }
    }
}
