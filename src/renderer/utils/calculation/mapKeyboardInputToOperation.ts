import {
  BasicOperationsCharacters,
  BasicOperationsKeyboardInput
} from '@renderer/types';

export function mapKeyboardInputToOperation(
  keyboardInput: BasicOperationsKeyboardInput
): BasicOperationsCharacters | null {
  if (keyboardInput === '+') {
    return '+';
  } else if (keyboardInput === '-') {
    return '-';
  } else if (keyboardInput === '*') {
    return '×';
  } else if (keyboardInput === '/') {
    return '÷';
  } else {
    //! Turn this into an error later on when adding tests?
    return null;
  }
}
