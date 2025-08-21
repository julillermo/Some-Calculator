import { DisplayValueString, isDisplayValueString } from '@renderer/types';
import {
  BASIC_NUMBER_PAD_LABELS,
  MAX_DISPLAYED_DIGIT
} from '@renderer/utils/constants';

import {
  appendToDisplayValue,
  insertInDisplayValue,
  removeChar
} from '@renderer/utils/string';
import { checkStringForDecimal } from '@renderer/utils/string/checkString';

type GetNumPadUpdatedDispalyValueProps = {
  numpadInput: (typeof BASIC_NUMBER_PAD_LABELS)[number];
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | undefined;
  };
};
type GetNumPadUpdatedDispalyValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | undefined;
};
export function getNumPadUpdatedDispalyValue({
  numpadInput,
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetNumPadUpdatedDispalyValueProps): GetNumPadUpdatedDispalyValueRes {
  const firstActiveValueDigit = displayValueString;
  const activeValueHasDecimal = checkStringForDecimal(displayValueString);
  const digitCount = removeChar(
    removeChar(displayValueString, ','),
    '.'
  ).length;

  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  if (isDisplayScreenFocused && selectionValue !== undefined) {
    if (numpadInput === '=') {
      // not yet implemented
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
        updatedDisplayValueString = appendToDisplayValue(
          displayValueString,
          numpadInput
        );
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
      // not yet implemented
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
