using IsracardCalculator.Contracts;

namespace IsracardCalculator.Services
{
    public class Division : ICalculator
    {
        public Task<bool> GetCalculation(double Number1, double Number2, out double result)
        {
            result = 0;
            try
            {
                result = Number1 / Number2;
                if (result != double.PositiveInfinity)
                    return Task.FromResult(true);
                return Task.FromResult(false);
            }
            catch (Exception ex) // if number / 0
            {
                return Task.FromResult(false);
            }
        }
    }
}
