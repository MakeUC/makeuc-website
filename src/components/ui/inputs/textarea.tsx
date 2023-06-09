"use client";
import * as React from "react";

import { cn } from "~/lib/utils";

import { Label } from "./label";


export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  name: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div>
        {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md background-inset px-3 py-2 text-sm ring-offset-background placeholder:foreground-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };
