import { useCallback } from "react";
import { Controller } from "react-hook-form";

import type { Control, Path, UseControllerReturn } from "react-hook-form";

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
  children: (props: ComponentProps, fieldProps: AnyControllerReturn["field"]) => JSX.Element,
) {
  // eslint-disable-next-line react/display-name
  return <ControlType extends AnyControl>({ control, ...props }: ComponentProps & WrappedInputProps<ControlType>) => {
    const render = useCallback(
      ({ field }: AnyControllerReturn) => children(props as ComponentProps, field),
      [props],
    );

    return (
      <Controller control={control} name={props.name} render={render} />
    );
  };
}
