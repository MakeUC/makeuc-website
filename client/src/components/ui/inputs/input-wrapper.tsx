import React, { useCallback } from "react";
import { Controller } from "react-hook-form";

import { cn } from "~/utils/className";

import { Label } from "./label";

import type { ReactNode } from "react";
import type { Control, Path, UseControllerReturn, ControllerFieldState, FieldValues } from "react-hook-form";



export interface WrappedInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
}


export function makeWrappedInput<ComponentProps, T extends FieldValues = FieldValues>(
  children: (props: ComponentProps, fieldProps: UseControllerReturn<T>["field"], fieldState?: UseControllerReturn<T>["fieldState"]) => JSX.Element,
) {
  // eslint-disable-next-line react/display-name
  return React.forwardRef(function WrappedInput(
    { control, name, ...props }: ComponentProps & WrappedInputProps<T>,
    ref: React.Ref<unknown>,
  ) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field, fieldState, formState }) => {
          // Always pass ref for compatibility with all input types
          return children({ ...(props as ComponentProps), name } as ComponentProps, field, fieldState);
        }}
      />
    );
  });
}


export interface FormFieldErrorProps {
  fieldState?: ControllerFieldState;
  children?: ReactNode;
  detachedError?: boolean;
}

export function FormFieldError({ fieldState, children, detachedError = false }: FormFieldErrorProps) {
  const errorMessage = fieldState?.error?.message;

  const childrenClass = errorMessage && !detachedError ? "remove-rounded-b no-push-in-bottom" : undefined;

  const errorClass = detachedError ? "rounded-md push-in-top push-in-bottom" : "rounded-b-md push-in-top-no-overhang push-in-bottom";

  return (
    <div className={cn("flex flex-col flex-1", detachedError ? "gap-4" : undefined)}>
      <div className={childrenClass}>{children}</div>
      {errorMessage && (
        <div className={cn("bg-destructive px-3 py-2 text-sm text-destructive-foreground", errorClass)}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}


export type LabelSide = "top" | "bottom" | "left" | "right";

const LabelSideCss: Record<LabelSide, string | undefined> = {
  top: "flex-col",
  bottom: "flex-col-reverse",
  left: "flex-row justify-start",
  right: "flex-row-reverse justify-end",
};

export interface FormFieldProps {
  name: string;
  label?: ReactNode;
  labelSide?: LabelSide;
  fieldState?: ControllerFieldState;
  detachedError?: boolean;
  children?: ReactNode;
  labelClassName?: string;
}

export function FormField({ name, label, labelSide = "top", fieldState, detachedError, children, labelClassName }: FormFieldProps): JSX.Element {
  if (!label) {
    return <>{children}</>;
  }

  return (
    <FormFieldError fieldState={fieldState} detachedError={detachedError}>
      <div className={cn("flex flex-1 gap-4", labelSide ? LabelSideCss[labelSide] : undefined)}>
        <Label className={cn("block", labelClassName)} htmlFor={name}>{label}</Label>
        <div>{children}</div>
      </div>
    </FormFieldError>
  );
}