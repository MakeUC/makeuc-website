"use client";

import * as React from "react";


import { Button } from "~/components/ui/button";
import { cn } from "~/utils/className";

import { FormField, makeWrappedInput } from "./input-wrapper";

import type { FormFieldProps , WrappedInputProps } from "./input-wrapper";
import type { FieldValues } from "react-hook-form";


function getFileNames(files: string | FileList | undefined): string | undefined {
  if (files === undefined) return undefined;
  if (typeof files === "string") return files;

  const fileNames = [];
  for (let i = 0; i < files.length; i++) {
    const name = files.item(i)?.name;

    if (!name) continue;
    fileNames.push(name);
  }

  return fileNames.join(", ");
}

export interface FileUploadRawProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "name">, Omit<FormFieldProps, "children"> {
  onChange?: (files: FileList | undefined) => void,
}

export const FileUploadRaw = React.forwardRef<HTMLInputElement, FileUploadRawProps>(
  ({
    className,
    label,
    labelSide,
    fieldState,
    detachedError,
    placeholder,
    // TODO: Add support for "value" input
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: _value,
    ...props
  }, ref) => {
    const [fileNames, setFileNames] = React.useState<string | undefined>(undefined);

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
      setFileNames(getFileNames(event.target.files || undefined));
      props.onChange?.(event.target.files || undefined);
    }, [props]);

    return (
      <FormField
        label={label}
        labelSide={labelSide}
        name={props.name}
        fieldState={fieldState}
        detachedError={detachedError}
      >
        <div className={cn(
          "relative flex h-10 w-full rounded-md text-sm ring-offset-background cursor-pointer",
          className,
        )}
        >
          <Button className="rounded-none rounded-l-md" type="button">
            Browse
          </Button>
          <div className={cn("flex items-center px-3 py-2 push-in-top push-in-bottom bg-background-inset rounded-r-md w-full text-foreground", !fileNames ? "text-foreground-inset" : undefined)}>
            {fileNames ?? placeholder}
          </div>
          <input
            className="absolute w-full h-full top-0 left-0 flex-1 opacity-0 z-10 cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed"
            type="file"
            {...props}
            onChange={onChange}
            ref={ref}
          />
        </div>
      </FormField>
    );
  },
);
FileUploadRaw.displayName = "FileUploadRaw";
export function FileUpload<T extends FieldValues = FieldValues>(props: WrappedInputProps<T> & FileUploadRawProps) {
  const Comp = makeWrappedInput<FileUploadRawProps, T>(
    (inputProps, fieldProps, fieldState) => <FileUploadRaw {...inputProps} {...fieldProps} fieldState={fieldState} />,
  );
  return <Comp {...props} />;
}
