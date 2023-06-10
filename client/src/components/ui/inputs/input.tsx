"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

import { Label } from "./label";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex-1">
        {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md push-in px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-inset focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
