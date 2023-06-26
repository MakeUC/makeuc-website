import type { SelectOption } from "~/components/ui/inputs/select";


export function makeSelectOptions(...options: string[]): SelectOption[] {
  return options.map(option => ({ key: option, value: option, label: option }));
}