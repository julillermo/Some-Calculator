import { DisplayValueString } from '@renderer/types';
import { insertCharAtIndex, insertCharEvery, removeChar } from './modifyString';
import { checkStringForDecimal, checkStringLastChar } from './checkString';
import { getNumberFromString } from './readString';

export function appendToDisplayValue(
  currentString: DisplayValueString,
  appendedString: DisplayValueString
): DisplayValueString {
  const outputString = (currentString + appendedString) as DisplayValueString;
  return outputString;
}

export function insertInDisplayValue(
  currentString: DisplayValueString,
  insertString: DisplayValueString,
  insertIndex: number
): DisplayValueString {
  return insertCharAtIndex(currentString, insertString, insertIndex);
}

export function formatDisplayValue(inputString: string): DisplayValueString {
  const [wholeNumberDigits, decimalDigits] = inputString.split('.');
  const commaFormattedWholeNumber = insertCharEvery(wholeNumberDigits, ',', 3);
  const joinChar = checkStringForDecimal(inputString) ? '.' : '';

  return [commaFormattedWholeNumber, decimalDigits].join(
    joinChar
  ) as DisplayValueString;
}

export function convertNumericalToDisplayValue(
  numericalValue: number
): DisplayValueString {
  return formatDisplayValue(`${numericalValue}`);
}

export function getDisplayAndNumericalValue(displayValue: DisplayValueString): {
  formattedDisplayValue: DisplayValueString;
  numericalValue: number | null;
} {
  const lastCharIsDecimalPoint = checkStringLastChar(displayValue, '.');
  const commaStrippedString = removeChar(displayValue, ',');
  const numericalValue = getNumberFromString(commaStrippedString);

  const reconstructedDisplayValueString = lastCharIsDecimalPoint
    ? commaStrippedString + '.'
    : commaStrippedString;

  const formattedDisplayValue = formatDisplayValue(
    reconstructedDisplayValueString
  );

  return { formattedDisplayValue, numericalValue };
}
