using IsracardCalculator.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using IsracardCalculator.Contracts;
using IsracardCalculator.Services;

namespace IsracardCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculatorController : ControllerBase
    {
        [HttpPost(Name = "ExerciseCalculation")]
        public async Task<IActionResult> ExerciseCalculation([FromBody] Calculator calc)
        {
            CalculationExerciseType calculationExerciseType = new CalculationExerciseType();
            ICalculator calculator = calculationExerciseType.GetCalculationExerciseType(calc.Operator);
            double result = 0;
            Task<bool> res = calculator.GetCalculation(calc.Number1, calc.Number2, out result);
            if (res.Result)
                return Ok(result);
            else
                return Ok(res.Result);
        }
    }
}
