namespace IsracardCalculator.Contracts
{
    public interface ICalculator
    {
        Task<bool> GetCalculation(double Number1, double Number2, out double result);
    }
}
