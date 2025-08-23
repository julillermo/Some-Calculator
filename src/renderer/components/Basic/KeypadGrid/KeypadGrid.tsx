import { getAriaLabel } from '@renderer/utils/aria/getAriaLabel';
import {
  BASIC_NUMBER_PAD_LABELS,
  BASIC_NUMBER_PAD_LABELS_ARIA,
  BASIC_OPERATIONS_CHARACTERS,
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
import { BasicOperationsCharacters } from '@renderer/types';

type BasicKeypadGridProps = {
  onBackspace: () => void;
  onMoveTextCursor: (args: number) => void;
  onNumpadClick: (args: string) => void;
  onMathOperationClick: (args: BasicOperationsCharacters) => void;
  onClearCalculator: () => void;
};
export const BasicKeypadGrid = ({
  onBackspace,
  onMoveTextCursor,
  onNumpadClick,
  onMathOperationClick,
  onClearCalculator
}: BasicKeypadGridProps): ReactNode => {
  return (
    <div className={basicKeypadGrid}>
      <BasicNumberPad onClick={onNumpadClick} />
      <BasicOperationsTray
        onClear={onClearCalculator}
        onBackspace={onBackspace}
        onMoveTextCursor={onMoveTextCursor}
        onMathOperationClick={onMathOperationClick}
      />
    </div>
  );
};

type BasicNumberPadArgs = {
  onClick: (label: string) => void;
};
const BasicNumberPad = ({ onClick }: BasicNumberPadArgs): ReactNode => {
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
            onClick={() => onClick(label)}
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
  onMathOperationClick: (operationLabel: BasicOperationsCharacters) => void;
};
const BasicOperationsTray = ({
  onBackspace,
  onClear,
  onMoveTextCursor,
  onMathOperationClick
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
    } else if (BASIC_OPERATIONS_CHARACTERS.includes(label)) {
      onMathOperationClick(label);
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
