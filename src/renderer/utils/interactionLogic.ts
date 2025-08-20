import { DisplayValueString, isDisplayValueString } from '@renderer/types';
import { BASIC_NUMBER_PAD_LABELS } from './constants';
import {
  appendToDisplayValue,
  checkStringForDecimal,
  removeCharByIndex,
  removeLastChar
} from './stringUtils';

type GetNumPadUpdatedDispalyValueProps = {
  numpadInput: (typeof BASIC_NUMBER_PAD_LABELS)[number];
  displayValueString: DisplayValueString;
};
export function getNumPadUpdatedDispalyValue({
  numpadInput,
  displayValueString
}: GetNumPadUpdatedDispalyValueProps): DisplayValueString {
  let displayValueStringRes = displayValueString;
  const firstActiveValueDigit = displayValueString[0];
  const activeValueHasDecimal = checkStringForDecimal(displayValueString);

  if (numpadInput === '=') {
    // not yet implemented
  } else if (numpadInput === '0') {
    if (firstActiveValueDigit !== '0') {
      displayValueStringRes = appendToDisplayValue(
        displayValueString,
        numpadInput
      );
    }
  } else if (numpadInput === '.') {
    if (!activeValueHasDecimal) {
      displayValueStringRes = appendToDisplayValue(
        displayValueString,
        numpadInput
      );
    }
  } else if (isDisplayValueString(numpadInput)) {
    displayValueStringRes =
      firstActiveValueDigit !== '0'
        ? appendToDisplayValue(displayValueString, numpadInput)
        : numpadInput;
  }
  return displayValueStringRes;
}

type GetBackspaceUpdatedDisplayValueProps = {
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | undefined;
  };
};
type GetBackspaceUpdatedDisplayValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | undefined;
};
export function getBackspaceUpdatedDisplayValue({
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetBackspaceUpdatedDisplayValueProps): GetBackspaceUpdatedDisplayValueRes {
  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  if (isDisplayScreenFocused) {
    if (selectionValue) {
      updatedDisplayValueString = removeCharByIndex(
        displayValueString,
        selectionValue
      );
      updatedTextCursorSelectionPosition = selectionValue - 1;
    }
  } else {
    updatedDisplayValueString = removeLastChar(displayValueString);
  }

  return {
    updatedDisplayValueString,
    updatedTextCursorSelectionPosition
  };
}
