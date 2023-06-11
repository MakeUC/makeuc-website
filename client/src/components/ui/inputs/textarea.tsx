"use client";
import * as React from "react";

import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps } from "./input-wrapper";


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
            "flex min-h-[80px] w-full rounded-md push-in-top push-in-bottom bg-background-inset px-3 py-2 text-sm ring-offset-background placeholder:text-foreground-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

export const TextArea = makeWrappedInput<TextAreaProps>(
  (props, fieldProps, fieldState) => <TextAreaRaw {...props} {...fieldProps} fieldState={fieldState} />,
);