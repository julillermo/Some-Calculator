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
  const {
    firstOperand = '',
    operation = '',
    secondOperand = ''
  } = expressionPartsRef.current;

  return firstOperand + operation + secondOperand;
}

type PrepareOperationTypeProps<T> = {
  currentValue?: DisplayValueString | number | null;
  expressionPartsRef: React.RefObject<Partial<T>>;
};

export function prepareOperationRef<
  T extends ExpressionPartsDisplayValueString | ExpressionPartsValues
>({ currentValue, expressionPartsRef }: PrepareOperationTypeProps<T>): void {
  const current = expressionPartsRef.current;
  if (current.operation === undefined) {
    current.firstOperand = currentValue ?? undefined;
  } else {
    current.secondOperand = currentValue ?? undefined;
  }
}

export function clearOperationRef<
  T extends ExpressionPartsDisplayValueString | ExpressionPartsValues
>(expressionPartsRef: React.RefObject<Partial<T>>): void {
  const current = expressionPartsRef.current;
  current.firstOperand = undefined;
  current.secondOperand = undefined;
  current.operation = undefined;
}
