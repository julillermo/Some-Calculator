import { ReactNode } from 'react';
import { TextArea } from 'react-aria-components';
import {
  displayScreenBottom,
  displayScreenContainer,
  displayScreenTop,
  heightVar
} from './DisplayScreen.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type DisplayScreenProps = {
  displayValue: string;
  height: number | `${number}px`;
};
export const DisplayScreen = ({
  displayValue,
  height
}: DisplayScreenProps): ReactNode => {
  const heightString = typeof height === 'number' ? height.toString() : height;
  return (
    <div
      className={displayScreenContainer}
      style={assignInlineVars({ [heightVar]: heightString })}
    >
      <DisplayScreenTop
        displayValue={displayValue}
        className={displayScreenTop}
      />
      <DisplayScreenBottom value={displayValue} />
    </div>
  );
};

type DisplayScreenTopProps = { displayValue: string; className?: string };
const DisplayScreenTop = ({
  displayValue,
  className
}: DisplayScreenTopProps): ReactNode => {
  return (
    <div
      className={className}
      style={{ height: '10px', backgroundColor: 'var(--red-3)' }}
    >
      {displayValue}
    </div>
  );
};

type DisplayScreenBottomProps = {
  value: string;
};
const DisplayScreenBottom = ({
  value
}: DisplayScreenBottomProps): ReactNode => {
  return <TextArea className={displayScreenBottom} value={value} readOnly />;
};
