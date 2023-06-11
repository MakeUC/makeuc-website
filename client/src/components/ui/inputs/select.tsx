"use client";

import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from "./select-root";

import type { FormFieldProps } from "./input-wrapper";
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";


export interface SelectOption {
  key: string;
  label?: string;
  value: string;
}

export interface SelectProps extends Omit<RadixSelectProps, "onValueChange" | "name">, Omit<FormFieldProps, "children"> {
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function SelectRaw({
  options,
  placeholder,
  label,
  labelSide,
  fieldState,
  detachedError,
  className,
  onChange,
  ...props
}: SelectProps) {
  return (
    <FormField
      label={label}
      labelSide={labelSide}
      name={props.name}
      fieldState={fieldState}
      detachedError={detachedError}
    >
      <SelectRoot onValueChange={onChange} {...props}>
        <SelectTrigger className={cn("push-in-top push-in-bottom bg-background-inset", className)}>
          <SelectValue placeholder={<span className="text-foreground-inset">{placeholder}</span>} />
        </SelectTrigger>
        <SelectContent className="overflow-y-auto max-h-60">
          {
            options?.map(option => (
              <SelectItem key={option.key} value={option.value} className="cursor-pointer">{option.label ?? option.value}</SelectItem>
            ))
          }
        </SelectContent>
      </SelectRoot>
    </FormField>
  );
}

export const Select = makeWrappedInput<SelectProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, { ref, ...fieldProps }, fieldState) => <SelectRaw {...props} {...fieldProps} fieldState={fieldState} />,
);