"use client";
import * as React from "react";

import { cn } from "~/utils/className";

import { makeWrappedInput } from "./input-wrapper";
import { Label } from "./label";


export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  name: string;
}

const TextAreaRaw = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div>
        {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md push-in px-3 py-2 text-sm ring-offset-background placeholder:text-foreground-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
TextAreaRaw.displayName = "TextAreaRaw";

export { TextAreaRaw };

export const TextArea = makeWrappedInput<TextAreaProps>(
  (props, fieldProps) => <TextAreaRaw {...props} {...fieldProps} />,
);