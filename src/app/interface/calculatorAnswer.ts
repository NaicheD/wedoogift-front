import {CalculatorComponentValue} from "./calculatorComponentValue";

export interface CalculatorAnswer {
  equal?: CalculatorComponentValue;
  floor?: CalculatorComponentValue;
  ceil?: CalculatorComponentValue;
}
