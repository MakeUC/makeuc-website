
import { FormTitle } from "~/components/general/typography";
import { cn } from "~/lib/utils";

import type { ReactNode } from "react";


export interface FormSectionProps {
  name: string;
  description: string;
  children: ReactNode | ReactNode[];
}

export function FormSection({ name, description, children }: FormSectionProps) {
  return (
    <>
      <hr className="border border-accent md:col-span-2" />
      <div className="flex flex-col mb-4 items-center text-center md:items-start md:mb-0 md:text-left">
        <FormTitle>{name}</FormTitle>
        <p className="text-sm max-w-sm mt-4 text-muted-foreground leading-8">{description}</p>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        {children}
      </div>
    </>
  );
}

export interface FormGroupProps {
  className?: string;
  children: ReactNode[];
}

export function FormGroup({ className, children }: FormGroupProps) {
  return (
    <div className={cn("flex flex-col gap-8 lg:flex-row", className)}>
      {children}
    </div>
  );
}