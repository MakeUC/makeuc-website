import { cn } from "~/utils";

import type { ReactNode } from "react";


export interface TypographyProps {
  className?: string;
  children?: ReactNode;
}

export function PageTitle({ className, children }: TypographyProps) {
  return <h1 className={cn("text-2xl font-medium my-10", className)}>{children}</h1>;
}

export function FormTitle({ className, children }: TypographyProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}