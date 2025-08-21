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
  const textCursorAdjustment = selectionValue === 0 ? 0 : -1;

  if (isDisplayScreenFocused) {
    if (selectionValue !== undefined) {
      updatedDisplayValueString = removeCharByIndex(
        displayValueString,
        selectionValue
      );
      updatedTextCursorSelectionPosition =
        selectionValue + textCursorAdjustment;
    }
  } else {
    updatedDisplayValueString = removeLastChar(displayValueString);
  }

  return {
    updatedDisplayValueString,
    updatedTextCursorSelectionPosition
  };
}
