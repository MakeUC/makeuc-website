"use client";
import * as React from "react";

import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from "./select-root";

import type { FormFieldProps , WrappedInputProps } from "./input-wrapper";
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import type { FieldValues } from "react-hook-form";


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

export const SelectRaw = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    placeholder,
    label,
    labelSide,
    fieldState,
    detachedError,
    className,
    onChange,
    ...props
  }, ref) => {
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
  },
);
SelectRaw.displayName = "SelectRaw";
export function Select<T extends FieldValues = FieldValues>(props: WrappedInputProps<T> & SelectProps) {
  const Comp = makeWrappedInput<SelectProps, T>(
    (inputProps, fieldProps, fieldState) => <SelectRaw {...inputProps} {...fieldProps} fieldState={fieldState} />,
  );
  return <Comp {...props} />;
}