import { cn } from "~/utils/className";

import type { ReactNode } from "react";


export interface ViewportSectionProps {
  className?: string;
  children?: ReactNode[] | ReactNode;
}

export function ViewportSection({ className, children }: ViewportSectionProps) {
  return (
    <section className={cn("min-h-[90vh]", className)}>
      {children}
    </section>
  );
}