import {
  DisplayValueString,
  ExpressionPartsDisplayValueString,
  ExpressionPartsValues
} from '@renderer/types';

export function combineExpressionPartsDisplay(
  expressionPartsRef: React.RefObject<
    Partial<ExpressionPartsDisplayValueString>
  >
): string {
  const firtOperandDisplay = expressionPartsRef.current.firstOperand ?? '';
  const operationDisplay = expressionPartsRef.current.operation ?? '';
  const secondOperandDisplay = expressionPartsRef.current.secondOperand ?? '';

  return firtOperandDisplay + operationDisplay + secondOperandDisplay;
}

type PrepareOparationTypeProps<T> = {
  currentValue?: DisplayValueString | number | null;
  expressionPartsRef: React.RefObject<Partial<T>>;
};
export function prepareOperationRef<
  T extends ExpressionPartsDisplayValueString | ExpressionPartsValues
>({ currentValue, expressionPartsRef }: PrepareOparationTypeProps<T>): void {
  if (expressionPartsRef.current.operation === undefined) {
    expressionPartsRef.current.firstOperand = currentValue ?? undefined;
  } else {
    expressionPartsRef.current.secondOperand = currentValue ?? undefined;
  }
}

export function clearOperationRef<
  T extends ExpressionPartsDisplayValueString | ExpressionPartsValues
>(expressionPartsRef: React.RefObject<Partial<T>>): void {
  expressionPartsRef.current.firstOperand = undefined;
  expressionPartsRef.current.secondOperand = undefined;
  expressionPartsRef.current.operation = undefined;
}
