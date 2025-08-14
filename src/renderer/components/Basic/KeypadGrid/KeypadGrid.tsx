import { displayValueString } from '@renderer/types';
import { getAriaLabel } from '@renderer/utils/ariaUtils';
import { handleNumpadInput } from '@renderer/utils/commonStateLogic';
import {
  BASIC_NUMBER_PAD_LABELS,
  BASIC_NUMBER_PAD_LABELS_ARIA,
  BASIC_OPERATIONS_TRAY_LABELS,
  BASIC_OPERATIONS_TRAY_LABELS_ARIA
} from '@renderer/utils/constants';
import { ReactNode } from 'react';
import { Button } from 'react-aria-components';
import {
  basicKeypadGrid,
  basicNumberPad,
  basicOperationsTray
} from './KeypadGrid.css';
import { removeLastChar } from '@renderer/utils/stringUtils';

type BasicKeypadGridProps = {
  displayValue: displayValueString;
  onDisplayValueChange: (args: displayValueString) => void;
};
export const BasicKeypadGrid = ({
  displayValue,
  onDisplayValueChange
}: BasicKeypadGridProps): ReactNode => {
  const handleClearDisplayValue = (): void => {
    onDisplayValueChange('');
  };

  const handleDelete = (): void => {
    onDisplayValueChange(removeLastChar(displayValue));
  };

  return (
    <div className={basicKeypadGrid}>
      <BasicNumberPad
        displayValue={displayValue}
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
  displayValue: displayValueString;
  onDisplayValueChange: (args: displayValueString) => void;
};
const BasicNumberPad = ({
  displayValue,
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
              handleNumpadInput({
                numpadInput: label,
                displayValue,
                setDisplayValueFn: onDisplayValueChange
              })
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
