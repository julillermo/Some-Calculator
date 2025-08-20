import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ReactNode } from 'react';
import { TextArea } from 'react-aria-components';
import {
  displayScreenBottom,
  displayScreenContainer,
  displayScreenTop,
  heightVar
} from './DisplayScreen.css';

type DisplayScreenProps = {
  displayValue: string;
  height: number | `${number}px`;
  bottomScreenRef: React.RefObject<HTMLTextAreaElement | null>;
};
export const DisplayScreen = ({
  displayValue,
  height,
  bottomScreenRef
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
      <DisplayScreenBottom textAreaRef={bottomScreenRef} value={displayValue} />
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
  textAreaRef?: React.RefObject<HTMLTextAreaElement | null>;
};
const DisplayScreenBottom = ({
  value,
  textAreaRef
}: DisplayScreenBottomProps): ReactNode => {
  return (
    <TextArea ref={textAreaRef} className={displayScreenBottom} value={value} />
  );
};
