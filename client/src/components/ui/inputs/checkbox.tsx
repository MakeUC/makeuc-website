"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";


import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps } from "./input-wrapper";


export interface CheckboxProps extends
  Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "onChange" | "value" | "onCheckedChange" | "name">,
  Omit<FormFieldProps, "children"> {
  onChange?: (value: boolean) => void;
}

const CheckboxRaw = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, labelSide = "right", detachedError = true, fieldState, onChange, ...props }, ref) => {
  return (
    <FormField
      name={props.name}
      label={label}
      labelSide={labelSide}
      fieldState={fieldState}
      detachedError={detachedError}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer flex h-6 w-6 shrink-0 rounded-sm push-in-top push-in-bottom bg-background-inset ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bump-out data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className,
        )}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-primary-foreground")}
        >
          <Check className="h-6 w-6" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </FormField>
  );
});
CheckboxRaw.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxRaw };

export const Checkbox = makeWrappedInput<CheckboxProps>(
  (props, { value, ...fieldProps }, fieldState) =>
    <CheckboxRaw {...props} {...fieldProps} checked={value} fieldState={fieldState} />,
);
