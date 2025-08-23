import { BasicOperationsCharacters, DisplayValueString } from '@renderer/types';
import { MAX_DISPLAYED_DIGIT } from '@renderer/utils/constants';
import { isDisplayValueString } from '@renderer/utils/types';

import {
  appendToDisplayValue,
  countDigitsInString,
  insertInDisplayValue
} from '@renderer/utils/string';
import { checkStringForDecimal } from '@renderer/utils/string/checkString';

type GetNumPadUpdatedDispalyValueProps = {
  numpadInput: BasicOperationsCharacters;
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | null;
  };
};
type GetNumPadUpdatedDispalyValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | null;
};
export function getNumPadUpdatedDispalyValue({
  numpadInput,
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetNumPadUpdatedDispalyValueProps): GetNumPadUpdatedDispalyValueRes {
  const firstActiveValueDigit = displayValueString;
  const activeValueHasDecimal = checkStringForDecimal(displayValueString);
  const digitCount = countDigitsInString(displayValueString);

  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  if (isDisplayScreenFocused && selectionValue !== null) {
    if (numpadInput === '=') {
      // implementation located at the root of the applicaiton / function call
    } else if (numpadInput === '.') {
      if (!activeValueHasDecimal && digitCount < MAX_DISPLAYED_DIGIT) {
        const adjustedNumpadInput = selectionValue === 0 ? '0.' : '.';
        const textCursorAdjustment = selectionValue === 0 ? 2 : 1;
        updatedDisplayValueString = insertInDisplayValue(
          displayValueString,
          adjustedNumpadInput,
          selectionValue
        );
        updatedTextCursorSelectionPosition =
          selectionValue + textCursorAdjustment;
      }
    } else if (isDisplayValueString(numpadInput)) {
      if (
        numpadInput === '0' &&
        firstActiveValueDigit !== '0' &&
        selectionValue === 0
      ) {
        if (displayValueString.length === 0) {
          updatedDisplayValueString = appendToDisplayValue(
            displayValueString,
            numpadInput
          );
        } else {
          // do nothing
        }
      } else {
        updatedDisplayValueString = insertInDisplayValue(
          displayValueString,
          numpadInput,
          selectionValue
        );
        updatedTextCursorSelectionPosition = selectionValue + 1;
      }
    }
  } else {
    if (numpadInput === '=') {
      // implementation located at the root of the applicaiton / function call
    } else if (numpadInput === '.') {
      if (!activeValueHasDecimal && digitCount < MAX_DISPLAYED_DIGIT) {
        const adjustedNumpadInput = digitCount === 0 ? '0.' : '.';
        updatedDisplayValueString = appendToDisplayValue(
          displayValueString,
          adjustedNumpadInput
        );
      }
    } else if (isDisplayValueString(numpadInput)) {
      if (numpadInput === '0' && firstActiveValueDigit !== '0') {
        updatedDisplayValueString = appendToDisplayValue(
          displayValueString,
          numpadInput
        );
      }
      updatedDisplayValueString =
        firstActiveValueDigit !== '0' || activeValueHasDecimal
          ? appendToDisplayValue(displayValueString, numpadInput)
          : numpadInput;
    }
  }
  return { updatedDisplayValueString, updatedTextCursorSelectionPosition };
}
