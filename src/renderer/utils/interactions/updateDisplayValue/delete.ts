import { DisplayValueString } from '@renderer/types';
import { removeCharByIndex } from '@renderer/utils/string';

type GetDeleteUpdatedDisplayValueProps = {
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | undefined;
  };
};
type GetDeleteUpdatedDisplayValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | undefined;
};
export function getDeleteUpdatedDisplayValue({
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetDeleteUpdatedDisplayValueProps): GetDeleteUpdatedDisplayValueRes {
  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  console.log({
    updatedDisplayValueString,
    updatedTextCursorSelectionPosition
  });

  if (isDisplayScreenFocused) {
    if (selectionValue !== undefined) {
      updatedDisplayValueString = removeCharByIndex(
        displayValueString,
        selectionValue + 1
      );
      updatedTextCursorSelectionPosition = selectionValue;
    }
  }

  return {
    updatedDisplayValueString,
    updatedTextCursorSelectionPosition
  };
}
