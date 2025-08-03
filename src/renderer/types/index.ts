export type displayValueString = '' | '.' | `${number}` | `${number}.${number}`;

export function isDisplayValueString(
  inputString: string
): inputString is displayValueString {
  const parsedFloat = parseFloat(inputString);
  return !isNaN(parsedFloat) || inputString === '.';
}
