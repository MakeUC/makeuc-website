"use client";

import * as React from "react";

import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps } from "./input-wrapper";


export type InputRawProps = React.InputHTMLAttributes<HTMLInputElement> & Omit<FormFieldProps, "children">;

const InputRaw = React.forwardRef<HTMLInputElement, InputRawProps>(
  ({ className, type, label, labelSide, fieldState, detachedError, ...props }, ref) => {
    return (
      <FormField
        label={label}
        labelSide={labelSide}
        name={props.name}
        fieldState={fieldState}
        detachedError={detachedError}
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md push-in-top push-in-bottom bg-background-inset px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-inset focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </FormField>
    );
  },
);
InputRaw.displayName = "InputRaw";

export { InputRaw };

export const Input = makeWrappedInput<InputRawProps>(
  (props, fieldProps, fieldState) => <InputRaw {...props} {...fieldProps} fieldState={fieldState} />,
);
