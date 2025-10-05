import { isElementFocused } from './htmlElement';

type BottomDisplayScreenDetails = {
  selectionValue: number | null;
  isDisplayScreenFocused: boolean;
};

export function getBottomDisplayScreenDetails(
  ref: React.RefObject<HTMLTextAreaElement | null>
): BottomDisplayScreenDetails {
  const element = ref.current;

  return {
    selectionValue: element?.selectionStart ?? null,
    isDisplayScreenFocused: isElementFocused(element)
  };
}
