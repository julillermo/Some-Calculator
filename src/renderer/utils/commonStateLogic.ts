import { displayValueString, isDisplayValueString } from '@renderer/types';
import { BASIC_NUMBER_PAD_LABELS } from './constants';
import { appendToDisplayValue, checkStringForDecimal } from './stringUtils';

export type handleNumpadInput = {
  numpadInput: (typeof BASIC_NUMBER_PAD_LABELS)[number];
  displayValue: displayValueString;
  setDisplayValueFn: (args: displayValueString) => void;
};
export const handleNumpadInput = ({
  numpadInput,
  displayValue,
  setDisplayValueFn
}: handleNumpadInput): void => {
  const firstActiveValueDigit = displayValue[0];
  const activeValueHasDecimal = checkStringForDecimal(displayValue);

  if (numpadInput === '=') {
    // not yet implemented
  } else if (numpadInput === '0') {
    if (firstActiveValueDigit !== '0') {
      setDisplayValueFn(appendToDisplayValue(displayValue, numpadInput));
      return;
    }
  } else if (numpadInput === '.') {
    if (!activeValueHasDecimal) {
      setDisplayValueFn(appendToDisplayValue(displayValue, numpadInput));
      return;
    }
  } else {
    isDisplayValueString(numpadInput) &&
      setDisplayValueFn(
        firstActiveValueDigit !== '0'
          ? appendToDisplayValue(displayValue, numpadInput)
          : numpadInput
      );
    return;
  }
};
