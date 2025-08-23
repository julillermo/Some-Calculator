import { AriaLabel } from '@renderer/utils/aria/getAriaLabel';

export const BASIC_NUMBER_PAD_LABELS = [
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
export const BASIC_OPERATIONS_TRAY_LABELS = [
  '←',
  '→',
  '×',
  '÷',
  '+',
  '-',
  '⌫',
  'clr'
];
export const BASIC_OPERATIONS_CHARACTERS = ['×', '÷', '+', '-'];
export const BASIC_OPERATIONS_KEYBOARD_INPUT = ['*', '/', '+', '-'];
export const BASIC_NUMBER_PAD_LABELS_ARIA: AriaLabel[] = [
  { label: '.', ariaLabel: 'decimal' }
];
export const BASIC_OPERATIONS_TRAY_LABELS_ARIA: AriaLabel[] = [
  { label: '⌫', ariaLabel: 'backspace' },
  { label: 'clr', ariaLabel: 'clear' }
];
export const MAX_DISPLAYED_DIGIT = 12;
