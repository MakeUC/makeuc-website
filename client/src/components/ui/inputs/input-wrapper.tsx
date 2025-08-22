import { useCallback } from "react";
import { Controller } from "react-hook-form";

import { cn } from "~/utils/className";

import { Label } from "./label";

import type { ReactNode } from "react";
import type { Control, Path, UseControllerReturn, ControllerFieldState } from "react-hook-form";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyControl = Control<any, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyControllerReturn = UseControllerReturn<any, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetName<ControlType extends AnyControl> = ControlType extends Control<infer P, any> ? Path<P> : never


export interface WrappedInputProps<ControlType extends AnyControl> {
  control: ControlType;
  name: GetName<ControlType>;
}

export function makeWrappedInput<ComponentProps>(
  children: (props: ComponentProps, fieldProps: AnyControllerReturn["field"], fieldState?: AnyControllerReturn["fieldState"]) => JSX.Element,
) {
  // eslint-disable-next-line react/display-name
  return <ControlType extends AnyControl>({ control, ...props }: ComponentProps & WrappedInputProps<ControlType>) => {
    const render = useCallback(
      ({ field, fieldState }: AnyControllerReturn) => children(props as ComponentProps, field, fieldState),
      [props],
    );

    return (
      <Controller control={control} name={props.name} render={render} />
    );
  };
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