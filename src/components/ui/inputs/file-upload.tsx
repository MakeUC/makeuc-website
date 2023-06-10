"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { Label } from "./label";


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

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  name: string;
}

export function FileUpload({ className, label, placeholder, ...props }: FileUploadProps) {
  const [fileNames, setFileNames] = React.useState<string | undefined>(undefined);

  const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event => {
    setFileNames(getFileNames(event.target.files || undefined));
  }, []);

  return (
    <div className="flex-1">
      {label && <Label className="block mb-4" htmlFor={props.name}>{label}</Label>}
      <div className={cn(
        "relative flex h-10 w-full rounded-md text-sm ring-offset-background cursor-pointer",
        className,
      )}
      >
        <Button className="rounded-none rounded-l-md">
          Browse
        </Button>
        <div className={cn("flex items-center px-3 py-2 push-in rounded-r-md w-full text-foreground", !fileNames ? "text-foreground-inset" : undefined)}>
          {fileNames ?? placeholder}
        </div>
        <input className="absolute w-full h-full top-0 left-0 flex-1 opacity-0 z-10 cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed" type="file" {...props} onChange={onChange} />
      </div>
    </div>
  );
}

