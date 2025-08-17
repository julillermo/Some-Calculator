import { displayValueString, isDisplayValueString } from '@renderer/types';
import { BASIC_NUMBER_PAD_LABELS } from './constants';
import { appendToDisplayValue, checkStringForDecimal } from './stringUtils';

type GetNumPadUpdatedDispalyValueProps = {
  numpadInput: (typeof BASIC_NUMBER_PAD_LABELS)[number];
  displayValueString: displayValueString;
};
export function getNumPadUpdatedDispalyValue({
  numpadInput,
  displayValueString
}: GetNumPadUpdatedDispalyValueProps): displayValueString {
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
