function isActiveElement(element: HTMLElement | null): boolean {
  return element !== null && document.activeElement === element;
}

function isCaretVisible(element: HTMLElement): boolean {
  const caretColor = getComputedStyle(element).caretColor;
  return caretColor !== 'transparent' && caretColor !== 'rgba(0, 0, 0, 0)';
}

export function isElementFocused(elementRef: HTMLElement | null): boolean {
  return elementRef !== null
    ? isActiveElement(elementRef) && isCaretVisible(elementRef)
    : false;
}
