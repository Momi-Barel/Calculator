using IsracardCalculator.Contracts;
using IsracardCalculator.Models;

namespace IsracardCalculator.Services
{
    public class CalculationExerciseType
    {
        public ICalculator GetCalculationExerciseType(string Operator)
        {
            try
            {
                switch (Operator)
                {
                    case "+":
                        return new Addition();
                    case "-":
                        return new Subtraction();
                    case "*":
                        return new Multipilication();
                    case "/":
                        return new Division();
                    default:
                        return (ICalculator)Task.FromResult(false);
                }
            }
            catch (Exception ex)
            {
                return (ICalculator)Task.FromResult(false);
            }
        }
    }
}
