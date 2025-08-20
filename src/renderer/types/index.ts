export type DisplayValueString = '' | '.' | `${number}` | `${number}.${number}`;

export function isDisplayValueString(
  inputString: string
): inputString is DisplayValueString {
  const parsedFloat = parseFloat(inputString);
  return !isNaN(parsedFloat) || inputString === '.';
}
