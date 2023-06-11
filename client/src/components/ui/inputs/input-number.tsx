import { forwardRef, useCallback } from "react";

import { InputRaw } from "./input";
import { makeWrappedInput } from "./input-wrapper";

import type { InputRawProps } from "./input";
import type { ChangeEventHandler } from "react";


export interface InputNumberRawProps extends Omit<InputRawProps, "onChange" | "type"> {
  value?: number;
  onChange?: (value: number | undefined) => void;
}

const InputNumberRaw = forwardRef<HTMLInputElement, InputNumberRawProps>(
  ({ onChange: _onChange, ...props }, ref) => {
    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
      if (event.target.value === "") return _onChange?.(undefined);

      const cleanValue = event.target.value.replaceAll(/[A-Za-z]/g, "") || "0";

      let finalValue = cleanValue.includes(".") ? parseFloat(cleanValue) : parseInt(cleanValue);

      if (cleanValue === undefined || isNaN(finalValue)) return _onChange?.(undefined);

      _onChange?.(finalValue);
    }, [_onChange]);

    return <InputRaw onChange={onChange} ref={ref} {...props} />;
  });

InputNumberRaw.displayName = "InputNumberRaw";

export { InputNumberRaw };

export const InputNumber = makeWrappedInput<InputNumberRawProps>(
  (props, fieldProps) => <InputNumberRaw {...props} {...fieldProps} />,
);