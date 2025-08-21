import { DisplayValueString } from '@renderer/types';
import { getAriaLabel } from '@renderer/utils/aria/getAriaLabel';
import {
  BASIC_NUMBER_PAD_LABELS,
  BASIC_NUMBER_PAD_LABELS_ARIA,
  BASIC_OPERATIONS_TRAY_LABELS,
  BASIC_OPERATIONS_TRAY_LABELS_ARIA
} from '@renderer/utils/constants';
import {
  getBackspaceUpdatedDisplayValue,
  getNumPadUpdatedDispalyValue
} from '@renderer/utils/interactions/updateDisplayValue/index';
import { ReactNode } from 'react';
import { Button } from 'react-aria-components';
import {
  basicKeypadGrid,
  basicNumberPad,
  basicOperationsTray
} from './KeypadGrid.css';

type BasicKeypadGridProps = {
  displayValueString: DisplayValueString;
  textCursorSelectionPosRefValue: React.RefObject<number | null>;
  bottomScreenRef: React.RefObject<HTMLTextAreaElement | null>;
  isDisplayScreenFocused: boolean;
  setIsDisplayScreenFocused: (args: boolean) => void;
  onDisplayValueChange: (args: DisplayValueString) => void;
};
export const BasicKeypadGrid = ({
  displayValueString,
  textCursorSelectionPosRefValue,
  bottomScreenRef,
  isDisplayScreenFocused = false,
  setIsDisplayScreenFocused,
  onDisplayValueChange
}: BasicKeypadGridProps): ReactNode => {
  /* === HandlerFunctions */
  const handleClearDisplayValue = (): void => {
    onDisplayValueChange('');
  };
  const handleBackspace = (): void => {
    const selectionValue = bottomScreenRef.current?.selectionStart;
    const { updatedDisplayValueString, updatedTextCursorSelectionPosition } =
      getBackspaceUpdatedDisplayValue({
        displayValueString,
        selectionOptions: {
          isDisplayScreenFocused,
          selectionValue
        }
      });

    onDisplayValueChange(updatedDisplayValueString);
    if (updatedTextCursorSelectionPosition !== undefined) {
      textCursorSelectionPosRefValue.current =
        updatedTextCursorSelectionPosition;
      bottomScreenRef.current?.focus();
    }
  };
  const handleMovetextCursor = (moveStep: number): void => {
    const displayValueStringLength = displayValueString.length;
    const selectionValue = textCursorSelectionPosRefValue.current;
    const cursorAtFarthestLeft = selectionValue === 0;
    const cursorAtFarthestRight = selectionValue === displayValueStringLength;

    if (selectionValue === null) {
      textCursorSelectionPosRefValue.current = displayValueStringLength;
      bottomScreenRef.current?.setSelectionRange(
        displayValueStringLength,
        displayValueStringLength
      );
    } else {
      const cursorIsWithinBounds =
        selectionValue >= 0 && selectionValue <= displayValueStringLength;
      if (cursorIsWithinBounds) {
        let adjustedMoveStep = moveStep;
        if (cursorAtFarthestLeft && moveStep < 0) {
          adjustedMoveStep = 0;
        } else if (cursorAtFarthestRight && moveStep > 0) {
          adjustedMoveStep = 0;
        }
        const adjustedSelectionValue = selectionValue + adjustedMoveStep;

        textCursorSelectionPosRefValue.current = adjustedSelectionValue;
        bottomScreenRef.current?.setSelectionRange(
          adjustedSelectionValue,
          adjustedSelectionValue
        );
      }
    }

    bottomScreenRef.current?.focus();
    setIsDisplayScreenFocused(true);
  };

  return (
    <div className={basicKeypadGrid}>
      <BasicNumberPad
        displayValueString={displayValueString}
        onDisplayValueChange={onDisplayValueChange}
      />
      <BasicOperationsTray
        onClear={handleClearDisplayValue}
        onBackspace={handleBackspace}
        onMoveTextCursor={handleMovetextCursor}
      />
    </div>
  );
};

type BasicNumberPadArgs = {
  displayValueString: DisplayValueString;
  onDisplayValueChange: (args: DisplayValueString) => void;
};
const BasicNumberPad = ({
  displayValueString,
  onDisplayValueChange
}: BasicNumberPadArgs): ReactNode => {
  return (
    <div className={basicNumberPad}>
      {BASIC_NUMBER_PAD_LABELS.map((label, index) => {
        const ariaLabel = getAriaLabel({
          ariaLabels: BASIC_NUMBER_PAD_LABELS_ARIA,
          label
        });
        return (
          <Button
            key={`${index}-${label}-number-pad-button`}
            onClick={() =>
              onDisplayValueChange(
                getNumPadUpdatedDispalyValue({
                  numpadInput: label,
                  displayValueString
                })
              )
            }
            aria-label={ariaLabel}
            style={{ fontSize: 24 }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

type BasicOperationsTrayProps = {
  onBackspace: () => void;
  onClear: () => void;
  onMoveTextCursor: (moveStep: number) => void;
};
const BasicOperationsTray = ({
  onBackspace,
  onClear,
  onMoveTextCursor
}: BasicOperationsTrayProps): ReactNode => {
  const handleClick = (label: string): void => {
    if (label === 'clr') {
      onClear();
      return;
    } else if (label === '⌫') {
      onBackspace();
      return;
    } else if (label === '←') {
      onMoveTextCursor(-1);
      return;
    } else if (label === '→') {
      onMoveTextCursor(1);
      return;
    }
  };

  return (
    <div className={basicOperationsTray}>
      {BASIC_OPERATIONS_TRAY_LABELS.map((label, index) => {
        const ariaLabel = getAriaLabel({
          ariaLabels: BASIC_OPERATIONS_TRAY_LABELS_ARIA,
          label
        });
        return (
          <Button
            key={`${index}-${label}-operations-tray-button`}
            onClick={() => handleClick(label)}
            aria-label={ariaLabel}
            style={{ fontSize: 24 }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
