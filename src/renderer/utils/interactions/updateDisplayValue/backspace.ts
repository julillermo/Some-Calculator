import { DisplayValueString } from '@renderer/types';
import { removeLastChar, removeCharByIndex } from '@renderer/utils/string';

type GetBackspaceUpdatedDisplayValueProps = {
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | undefined;
  };
};
type GetBackspaceUpdatedDisplayValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | undefined;
};
export function getBackspaceUpdatedDisplayValue({
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetBackspaceUpdatedDisplayValueProps): GetBackspaceUpdatedDisplayValueRes {
  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  if (isDisplayScreenFocused) {
    if (selectionValue) {
      updatedDisplayValueString = removeCharByIndex(
        displayValueString,
        selectionValue
      );
      updatedTextCursorSelectionPosition = selectionValue - 1;
    }
  } else {
    updatedDisplayValueString = removeLastChar(displayValueString);
  }

  return {
    updatedDisplayValueString,
    updatedTextCursorSelectionPosition
  };
}
