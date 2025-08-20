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
  'del',
  'clr'
];
export const BASIC_NUMBER_PAD_LABELS_ARIA: AriaLabel[] = [
  { label: '.', ariaLabel: 'decimal' }
];
export const BASIC_OPERATIONS_TRAY_LABELS_ARIA: AriaLabel[] = [
  { label: 'del', ariaLabel: 'delete' },
  { label: 'clr', ariaLabel: 'clear' }
];
