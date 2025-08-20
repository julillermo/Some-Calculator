export function countDigitsInString(stringToCheck: string): number {
  const matchedDigits = stringToCheck
    .match(/\d?/g)
    ?.filter((chunk) => chunk !== '');
  const digitCount = matchedDigits ? matchedDigits.length : 0;
  return digitCount;
}

export function getNumberFromString(inputString: string): number | null {
  const floatValue = parseFloat(inputString);
  return !isNaN(floatValue) ? floatValue : null;
}
