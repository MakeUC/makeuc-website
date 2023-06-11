"use client";

import { cn } from "~/utils/className";

import { makeWrappedInput } from "./input-wrapper";
import { Label } from "./label";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from "./select-root";

import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";


export interface SelectOption {
  key: string;
  label?: string;
  value: string;
}

export interface SelectProps extends Omit<RadixSelectProps, "onValueChange"> {
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  label?: string;
  name: string;
  className?: string;
}

export function SelectRaw({ options, placeholder, label, className, onChange, ...props }: SelectProps) {
  return (
    <div className="flex-1">
      {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
      <SelectRoot onValueChange={onChange} {...props}>
        <SelectTrigger className={cn("push-in", className)}>
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
    </div >
  );
}

export const Select = makeWrappedInput<SelectProps>((props, fieldProps) => <SelectRaw {...props} {...fieldProps} />);