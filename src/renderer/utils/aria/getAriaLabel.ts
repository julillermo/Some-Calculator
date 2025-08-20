export type AriaLabel = { label: string; ariaLabel: string };
type GetAriaLabelProps = {
  ariaLabels: AriaLabel[];
  label: string;
};
export function getAriaLabel({ ariaLabels, label }: GetAriaLabelProps): string {
  const labelsToCheckFor = ariaLabels.map((obj) => obj.label);

  if (labelsToCheckFor.includes(label)) {
    const ariaLabel = ariaLabels.find((obj) => obj.label === label)?.ariaLabel;
    return ariaLabel ?? label;
  } else {
    return label;
  }
}
