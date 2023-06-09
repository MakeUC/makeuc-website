import type { ReactNode } from "react";


export interface TypographyProps {
  children?: ReactNode;
}

export function PageTitle({ children }: TypographyProps) {
  return <h1 className="text-2xl font-medium my-10">{children}</h1>;
}

export function FormTitle({ children }: TypographyProps) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}