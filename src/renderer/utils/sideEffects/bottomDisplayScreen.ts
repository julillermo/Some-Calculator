import { isElementFocused } from './htmlElement';

type GetBottomDisplayScreenDetailsRes = {
  selectionValue: number | null;
  isDisplayScreenFocused: boolean;
};
export function getBottomDisplayScreenDetails(
  bottomDisplayScreenRef: React.RefObject<HTMLTextAreaElement | null>
): GetBottomDisplayScreenDetailsRes {
  const selectionValue = bottomDisplayScreenRef.current?.selectionStart ?? null;
  const isDisplayScreenFocused = isElementFocused(
    bottomDisplayScreenRef.current
  );
  return {
    selectionValue,
    isDisplayScreenFocused
  };
}
