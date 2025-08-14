import { displayValueString } from '@renderer/types';

export function countDigitsInString(stringToCheck: string): number {
  const matchedDigits = stringToCheck
    .match(/\d?/g)
    ?.filter((chunk) => chunk !== '');
  const digitCount = matchedDigits ? matchedDigits.length : 0;
  return digitCount;
}

export function appendToDisplayValue(
  currentString: displayValueString,
  appendedString: displayValueString
): displayValueString {
  const outputString = (currentString + appendedString) as displayValueString;
  return outputString;
}

export function removeChar(inputString: string, char: string): string {
  return inputString.split(char).join('');
}

export function removeLastChar<T extends string>(inputString: T): T {
  return inputString.slice(0, inputString.length - 1) as T;
}

export function checkStringForDecimal(inputString: string): boolean {
  const matchRes = inputString.match(/\./g);
  return matchRes !== null && matchRes.length > 0;
}

export function checkStringLastChar(
  inputString: string,
  char: string
): boolean {
  return inputString[inputString.length - 1] === char;
}

export function insertCharEvery(
  inputString: string,
  insertChar: string,
  interval: number
): string {
  const reversedStringList = inputString.split('').reverse();
  const updatedStringList = [];

  for (const [index, stringChar] of reversedStringList.entries()) {
    const oneBasedIndex = index + 1;
    updatedStringList.push(stringChar);
    if (
      oneBasedIndex % interval === 0 &&
      oneBasedIndex < reversedStringList.length
    ) {
      updatedStringList.push(insertChar);
    }
  }

  return updatedStringList.reverse().join('');
}

function getNumberFromString(inputString: string): number | null {
  const floatValue = parseFloat(inputString);
  return !isNaN(floatValue) ? floatValue : null;
}

export function formatDisplayValue(inputString: string): displayValueString {
  const [wholeNumberDigits, decimalDigits] = inputString.split('.');
  const commaFormattedWholeNumber = insertCharEvery(wholeNumberDigits, ',', 3);
  const joinChar = checkStringForDecimal(inputString) ? '.' : '';

  return [commaFormattedWholeNumber, decimalDigits].join(
    joinChar
  ) as displayValueString;
}

export function getDisplayAndNumericalValue(displayValue: displayValueString): {
  formattedDisplayValue: displayValueString;
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
