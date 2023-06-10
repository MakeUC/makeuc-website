"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

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
import { cn } from "~/lib/utils";

import { Label } from "./label";


export interface ComboboxOption {
  key: string;
  label?: string;
  value: string;
}

export interface ComboboxProps {
  label?: string;
  name?: string;
  options?: ComboboxOption[];
  placeholder?: React.ReactNode;
  searchText?: string;
  empty?: React.ReactNode;
}

export function Combobox({ label, name, options, placeholder = "Select Option", searchText = "Search Options", empty = "No Option Found" }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedOption = React.useMemo(
    () => !!value ? options?.find(option => option.value === value) : undefined,
    [options, value],
  );

  return (
    <div className="flex-1">
      {label && <Label className="block mb-4" htmlFor={name}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            aria-expanded={open}
            className="flex h-10 w-full rounded-md push-in px-3 py-2 text-sm items-center justify-between cursor-pointer"
          >
            {selectedOption ? selectedOption.label ?? selectedOption.value : <span className="text-foreground-inset">{placeholder}</span>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchText} />
            <CommandEmpty>{empty}</CommandEmpty>
            <CommandGroup className="overflow-y-auto max-h-60">
              {options?.map(option => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
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
    </div>
  );
}
