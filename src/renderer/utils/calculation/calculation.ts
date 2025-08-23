import { ExpressionPartsValues } from '@renderer/types';

export function calculateExpression({
  firstOperand,
  secondOperand,
  operation
}: ExpressionPartsValues): number | null {
  if (
    firstOperand !== undefined &&
    secondOperand !== undefined &&
    operation !== undefined
  ) {
    if (operation === '+') {
      return firstOperand + secondOperand;
    } else if (operation === '-') {
      return firstOperand - secondOperand;
    } else if (operation === '×') {
      return firstOperand * secondOperand;
    } else if (operation === '÷') {
      return firstOperand / secondOperand;
    } else {
      //! turn this into an error when adding tests
      return null;
    }
  } else {
    return null;
  }
}
