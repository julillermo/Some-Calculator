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
