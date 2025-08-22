"use client";
import * as React from "react";

import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps , WrappedInputProps } from "./input-wrapper";
import type { FieldValues } from "react-hook-form";


export type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & Omit<FormFieldProps, "children">;

const TextAreaRaw = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, labelSide, fieldState, detachedError, ...props }, ref) => {
    return (
      <FormField
        label={label}
        labelSide={labelSide}
        name={props.name}
        fieldState={fieldState}
        detachedError={detachedError}
      >
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md push-in-top push-in-bottom bg-background-inset px-3 py-2 text-sm ring-offset-background placeholder:text-foreground-inset disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </FormField>
    );
  },
);
TextAreaRaw.displayName = "TextAreaRaw";

export { TextAreaRaw };
export function TextArea<T extends FieldValues = FieldValues>(props: WrappedInputProps<T> & TextAreaProps) {
  const Comp = makeWrappedInput<TextAreaProps, T>(
    (inputProps, fieldProps, fieldState) => <TextAreaRaw {...inputProps} {...fieldProps} fieldState={fieldState} />,
  );
  return <Comp {...props} />;
}