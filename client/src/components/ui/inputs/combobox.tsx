"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps } from "./input-wrapper";
import type { Command as CommandPrimitive } from "cmdk";
import type { ComponentPropsWithoutRef, ReactNode, KeyboardEventHandler } from "react";


export interface ComboboxOption {
  key: string;
  label?: string;
  value: string;
}

export interface ComboboxProps extends Omit<FormFieldProps, "children"> {
  options?: ComboboxOption[];
  placeholder?: ReactNode;
  searchText?: string;
  empty?: ReactNode;
  command?: ComponentPropsWithoutRef<typeof CommandPrimitive>,
  value?: string;
  onSearch?: (search: string) => void;
  onChange?: (value: string) => void;
}

export function ComboboxRaw({
  label,
  labelSide,
  name,
  fieldState,
  detachedError,
  options,
  placeholder = "Select Option",
  searchText = "Search Options",
  empty = "No Option Found",
  command,
  value: _value,
  onSearch,
  onChange: _onChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const value = useMemo(() => _value ?? internalValue, [_value, internalValue]);

  const selectedOption = useMemo(
    () => !!value ? options?.find(option => option.value === value) : undefined,
    [options, value],
  );

  const onChange = useCallback((newValue: string) => {
    _onChange?.(newValue);
    setInternalValue(newValue);
    setOpen(false);
  }, [_onChange]);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(event => {
    if (event.keyCode !== 9 && !event.shiftKey)
      setOpen(true);
  }, []);

  return (
    <FormField name={name} label={label} labelSide={labelSide} fieldState={fieldState} detachedError={detachedError}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild tabIndex={0} onKeyDown={onKeyDown}>
          <div
            aria-expanded={open}
            className="flex h-10 w-full rounded-md push-in-top push-in-bottom bg-background-inset px-3 py-2 text-sm items-center justify-between cursor-pointer"
          >
            {selectedOption ? selectedOption.label ?? selectedOption.value : <span className="text-foreground-inset">{placeholder}</span>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command {...command}>
            <CommandInput placeholder={searchText} onValueChange={onSearch} />
            <CommandEmpty>{empty}</CommandEmpty>
            <CommandGroup className="overflow-y-auto max-h-60">
              {options?.map(option => (
                <CommandItem
                  key={option.value}
                  onSelect={() => onChange(option.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export const Combobox = makeWrappedInput<ComboboxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, { ref, ...fieldProps }, fieldState) => <ComboboxRaw {...props} {...fieldProps} fieldState={fieldState} />,
);