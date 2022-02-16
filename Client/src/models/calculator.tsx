export class Calculator {
    number1: number;
    number2: number;
    result: string;
    operator: string;
   
    constructor(number1: number, number2: number, result: string, operator: string) {
      this.number1 = number1;
      this.number2 = number2;
      this.result = result;
      this.operator = operator;
    }
  }