"use client";

import { Label } from "./label";
import { SelectContent, SelectItem, SelectRaw, SelectTrigger, SelectValue } from "./select-raw";

import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";


export interface SelectOption {
  key: string;
  label?: string;
  value: string;
}

export interface SelectProps extends RadixSelectProps {
  options?: SelectOption[];
  placeholder?: string;
  label?: string;
  name: string;
}

export function Select({ options, placeholder, label, ...props }: SelectProps) {
  return (
    <div className="flex-1">
      {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
      <SelectRaw>
        <SelectTrigger className="push-in">
          <SelectValue placeholder={<span className="text-foreground-inset">{placeholder}</span>} />
        </SelectTrigger>
        <SelectContent className="overflow-y-auto max-h-60">
          {
            options?.map(option => (
              <SelectItem key={option.key} value={option.value} className="cursor-pointer">{option.label ?? option.value}</SelectItem>
            ))
          }
        </SelectContent>
      </SelectRaw>
    </div >
  );
}