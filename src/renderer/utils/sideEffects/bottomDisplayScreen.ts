import { isElementFocused } from './htmlElement';

type GetBottomDisplayScreenDetailsRes = {
  selectionValue: number | undefined;
  isDisplayScreenFocused: boolean;
};
export function getBottomDisplayScreenDetails(
  bottomDisplayScreenRef: React.RefObject<HTMLTextAreaElement | null>
): GetBottomDisplayScreenDetailsRes {
  const selectionValue = bottomDisplayScreenRef.current?.selectionStart;
  const isDisplayScreenFocused = isElementFocused(
    bottomDisplayScreenRef.current
  );
  return {
    selectionValue,
    isDisplayScreenFocused
  };
}
