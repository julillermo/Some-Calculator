import { DisplayValueString } from '@renderer/types';
import { removeCharByIndex } from '@renderer/utils/string';

type GetDeleteUpdatedDisplayValueProps = {
  displayValueString: DisplayValueString;
  selectionOptions: {
    isDisplayScreenFocused: boolean;
    selectionValue: number | null;
  };
};
type GetDeleteUpdatedDisplayValueRes = {
  updatedDisplayValueString: DisplayValueString;
  updatedTextCursorSelectionPosition: number | null;
};
export function getDeleteUpdatedDisplayValue({
  displayValueString,
  selectionOptions: { isDisplayScreenFocused, selectionValue }
}: GetDeleteUpdatedDisplayValueProps): GetDeleteUpdatedDisplayValueRes {
  let updatedDisplayValueString = displayValueString;
  let updatedTextCursorSelectionPosition = selectionValue;

  if (isDisplayScreenFocused) {
    if (selectionValue !== null) {
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
