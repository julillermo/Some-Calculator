import { style, createVar } from '@vanilla-extract/css';

export const heightVar = createVar();

export const displayScreenContainer = style({
  height: heightVar,
  display: 'flex',
  flexDirection: 'column'
});

export const displayScreenTop = style({
  display: 'flex',
  flex: 1,
  justifyContent: 'right',

  textAlign: 'right',
  fontSize: 24
});

export const displayScreenBottom = style({
  display: 'flex',
  flex: 1,
  resize: 'none',

  textAlign: 'right',
  fontSize: 24
});
