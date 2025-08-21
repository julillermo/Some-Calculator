import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ReactNode } from 'react';
import { TextArea } from 'react-aria-components';
import {
  displayScreenBottom,
  displayScreenContainer,
  displayScreenTop,
  heightVar
} from './DisplayScreen.css';
import { DisplayValueString } from '@renderer/types';

type DisplayScreenProps = {
  topScreenValue: string;
  bottomScreenValue: DisplayValueString;
  height: number | `${number}px`;
  bottomScreenRef: React.RefObject<HTMLTextAreaElement | null>;
};
export const DisplayScreen = ({
  topScreenValue,
  bottomScreenValue,
  height,
  bottomScreenRef
}: DisplayScreenProps): ReactNode => {
  const heightString = typeof height === 'number' ? height.toString() : height;
  return (
    <div
      className={displayScreenContainer}
      style={assignInlineVars({ [heightVar]: heightString })}
    >
      <DisplayScreenTop value={topScreenValue} className={displayScreenTop} />
      <DisplayScreenBottom
        textAreaRef={bottomScreenRef}
        value={bottomScreenValue}
      />
    </div>
  );
};

type DisplayScreenTopProps = { value: string; className?: string };
const DisplayScreenTop = ({
  value,
  className
}: DisplayScreenTopProps): ReactNode => {
  return (
    <div
      className={className}
      style={{ height: '10px', backgroundColor: 'var(--red-3)' }}
    >
      {value}
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
