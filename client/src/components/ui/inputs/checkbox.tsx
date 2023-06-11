"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "~/utils/className";

import { makeWrappedInput } from "./input-wrapper";
import { Label } from "./label";


export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "onChange" | "value" | "onCheckedChange"> {
  label?: React.ReactNode;
  name: string;
  topLabel?: boolean;
  onChange?: (value: boolean) => void;
}

const CheckboxRaw = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, topLabel = false, onChange, ...props }, ref) => {
  return (
    <div className={cn("flex-1", !topLabel ? "flex flex-row-reverse justify-end gap-4" : undefined)}>
      {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-6 w-6 shrink-0 rounded-sm push-in ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bump-out data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
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
    </div>
  );
});
CheckboxRaw.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxRaw };

export const Checkbox = makeWrappedInput<CheckboxProps>(
  (props, { value, ...fieldProps }) => <CheckboxRaw {...props} {...fieldProps} checked={value} />,
);
