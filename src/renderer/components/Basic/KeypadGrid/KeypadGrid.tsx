import { ReactNode } from 'react';
import {
  basicKeypadGrid,
  basicNumberPad,
  basicOperationsTray
} from './KeypadGrid.css';
import { Button } from 'react-aria-components';
import { AriaLabel, getAriaLabel } from '@renderer/utils/ariaUtils';
import { displayValueString, isDisplayValueString } from '@renderer/types';
import {
  appendToDisplayValue,
  checkStringForDecimal
} from '@renderer/utils/stringUtils';

const BASIC_NUMBER_PAD_LABELS = [
  '7',
  '8',
  '9',
  '4',
  '5',
  '6',
  '1',
  '2',
  '3',
  '.',
  '0',
  '='
];
const BASIC_OPERATIONS_TRAY_LABELS = [
  '←',
  '→',
  '×',
  '÷',
  '+',
  '-',
  'del',
  'clr'
];
const BASIC_NUMBER_PAD_LABELS_ARIA: AriaLabel[] = [
  { label: '.', ariaLabel: 'decimal' }
];
const BASIC_OPERATIONS_TRAY_LABELS_ARIA: AriaLabel[] = [
  { label: 'del', ariaLabel: 'delete' },
  { label: 'clr', ariaLabel: 'clear' }
];

type BasicKeypadGridProps = {
  displayValue: displayValueString;
  setDisplayValue: (args: displayValueString) => void;
};
export const BasicKeypadGrid = ({
  displayValue,
  setDisplayValue
}: BasicKeypadGridProps): ReactNode => {
  const handleClearActiveValue = (): void => {
    setDisplayValue('');
  };

  const handleDelete = (): void => {
    const lastRemoved = displayValue.slice(0, displayValue.length - 1);
    setDisplayValue(lastRemoved as displayValueString);
  };

  return (
    <div className={basicKeypadGrid}>
      <BasicNumberPad
        activeValue={displayValue}
        setActiveValue={setDisplayValue}
      />
      <BasicOperationsTray
        onClear={handleClearActiveValue}
        onDelete={handleDelete}
      />
    </div>
  );
};

type BasicNumberPadArgs = {
  activeValue: displayValueString;
  setActiveValue: (args: displayValueString) => void;
};
const BasicNumberPad = ({
  activeValue,
  setActiveValue
}: BasicNumberPadArgs): ReactNode => {
  const handleClick = (label: string): void => {
    const firstActiveValueDigit = activeValue[0];
    const activeValueHasDecimal = checkStringForDecimal(activeValue);

    if (label === '=') {
      // not yet implemented
    } else if (label === '0') {
      if (firstActiveValueDigit !== '0') {
        setActiveValue(appendToDisplayValue(activeValue, label));
        return;
      }
    } else if (label === '.') {
      if (!activeValueHasDecimal) {
        setActiveValue(appendToDisplayValue(activeValue, label));
        return;
      }
    } else {
      isDisplayValueString(label) &&
        setActiveValue(
          firstActiveValueDigit !== '0'
            ? appendToDisplayValue(activeValue, label)
            : label
        );
      return;
    }
  };

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
