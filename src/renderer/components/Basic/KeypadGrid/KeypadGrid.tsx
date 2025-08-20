import { DisplayValueString } from '@renderer/types';
import { getAriaLabel } from '@renderer/utils/ariaUtils';
import {
  BASIC_NUMBER_PAD_LABELS,
  BASIC_NUMBER_PAD_LABELS_ARIA,
  BASIC_OPERATIONS_TRAY_LABELS,
  BASIC_OPERATIONS_TRAY_LABELS_ARIA
} from '@renderer/utils/constants';
import {
  getBackspaceUpdatedDisplayValue,
  getNumPadUpdatedDispalyValue
} from '@renderer/utils/interactionLogic';
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
  isDisplayScreenFocused?: boolean;
  onDisplayValueChange: (args: DisplayValueString) => void;
};
export const BasicKeypadGrid = ({
  displayValueString,
  textCursorSelectionPosRefValue,
  bottomScreenRef,
  isDisplayScreenFocused = false,
  onDisplayValueChange
}: BasicKeypadGridProps): ReactNode => {
  const handleClearDisplayValue = (): void => {
    onDisplayValueChange('');
  };

  const handleDelete = (): void => {
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

  return (
    <div className={basicKeypadGrid}>
      <BasicNumberPad
        displayValueString={displayValueString}
        onDisplayValueChange={onDisplayValueChange}
      />
      <BasicOperationsTray
        onClear={handleClearDisplayValue}
        onDelete={handleDelete}
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
  onDelete: () => void;
  onClear: () => void;
};
const BasicOperationsTray = ({
  onDelete,
  onClear
}: BasicOperationsTrayProps): ReactNode => {
  const handleClick = (label: string): void => {
    if (label === 'clr') {
      onClear();
      return;
    }
    if (label === 'del') {
      onDelete();
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
