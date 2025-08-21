export function insertCharAtIndex<T extends string>(
  inputString: T,
  insertChar: string,
  insertIndex: number
): T {
  const firstHalf = inputString.slice(0, insertIndex);
  const secondHalf = inputString.slice(insertIndex, inputString.length);
  return (firstHalf + insertChar + secondHalf) as T;
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
    // const charAtIndex = inputString[index - 1];
    const secondHalf = inputString.slice(index, inputString.length);

    // console.log({ index, firstHalf, charAtIndex, secondHalf });
    return (firstHalf + secondHalf) as T;
  };

  return index !== undefined && index > 0
    ? removeCharByKnownIndex(inputString, index)
    : inputString;
}
