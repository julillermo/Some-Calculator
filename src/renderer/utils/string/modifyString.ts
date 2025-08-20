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

export function removeChar(inputString: string, char: string): string {
  return inputString.split(char).join('');
}

export function removeLastChar<T extends string>(inputString: T): T {
  return inputString.slice(0, inputString.length - 1) as T;
}

export function removeCharByIndex<T extends string>(
  inputString: T,
  index: number | undefined
): T {
  const removeCharByKnownIndex = function <T extends string>(
    inputString: T,
    index: number
  ): T {
    const firstHalf = inputString.slice(0, index - 1);
    // const charAtIndex = inputString[index];
    const secondHalf = inputString.slice(index, inputString.length);
    return (firstHalf + secondHalf) as T;
  };

  return index !== undefined
    ? removeCharByKnownIndex(inputString, index)
    : inputString;
}
