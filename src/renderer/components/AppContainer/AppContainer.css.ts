import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const flexContainer = style({
  display: 'flex',
  flex: 1,
  backgroundColor: 'var(--teal-1)',
  padding: 8,
  height: calc.subtract('100vh', '16px')
});
