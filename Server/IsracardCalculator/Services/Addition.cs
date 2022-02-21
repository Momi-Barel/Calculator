using IsracardCalculator.Contracts;

namespace IsracardCalculator.Services
{
    public class Addition : ICalculator
    {
        public Task<bool> GetCalculation(double Number1, double Number2, out double result)
        {
            result = Number1 + Number2;
            return Task.FromResult(true);
        }
    }
}
