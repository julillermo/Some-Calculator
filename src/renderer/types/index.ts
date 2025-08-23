import {
  BASIC_OPERATIONS_CHARACTERS,
  BASIC_OPERATIONS_KEYBOARD_INPUT
} from '@renderer/utils/constants';

export type DisplayValueString = '' | '.' | `${number}` | `${number}.${number}`;
export type BasicOperationsCharacters =
  (typeof BASIC_OPERATIONS_CHARACTERS)[number];
export type BasicOperationsKeyboardInput =
  (typeof BASIC_OPERATIONS_KEYBOARD_INPUT)[number];
export type ExpressionPartsDisplayValueString = {
  firstOperand: DisplayValueString | undefined;
  secondOperand: DisplayValueString | undefined;
  operation: BasicOperationsCharacters | undefined;
};
export type ExpressionPartsValues = {
  firstOperand: number | undefined;
  secondOperand: number | undefined;
  operation: BasicOperationsCharacters | undefined;
};
