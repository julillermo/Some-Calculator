import { DisplayValueString } from '@renderer/types';

export function isDisplayValueString(
  inputString: string
): inputString is DisplayValueString {
  const parsedFloat = parseFloat(inputString);
  return !isNaN(parsedFloat) || inputString === '.';
}
