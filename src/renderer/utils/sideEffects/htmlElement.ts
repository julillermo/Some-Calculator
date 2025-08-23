export function isElementFocused(elementRef: HTMLElement | null): boolean {
  const isKnownElementFocused = (elementRef: HTMLElement): boolean => {
    const isActiveElement = document.activeElement === elementRef;
    const caretColor = getComputedStyle(elementRef).caretColor;
    const isCaretHiddenByCss =
      caretColor === 'transparent' || caretColor === 'rgba(0, 0, 0, 0)';
    return isActiveElement && !isCaretHiddenByCss;
  };

  return elementRef !== null ? isKnownElementFocused(elementRef) : false;
}
