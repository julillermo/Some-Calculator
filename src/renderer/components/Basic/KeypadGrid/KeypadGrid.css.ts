import { style } from '@vanilla-extract/css';

export const basicKeypadGrid = style({
  backgroundColor: 'var(--blue-2)',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '1fr',
  gap: 12,
  height: '100%',
  width: '100%'
});

export const basicNumberPad = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gap: 12,

  height: '100%',
  width: '100%'
});

export const basicOperationsTray = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gap: 12,

  height: '100%',
  width: '100%'
});
