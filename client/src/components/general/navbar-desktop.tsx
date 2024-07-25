import Link from "next/link";

import { cn } from "~/utils/className";

import type { NavigationLink } from "./layout-header";
import type { ReactNode } from "react";


interface NavLinkProps {
  href: string;
  children?: ReactNode;
}

// TODO: Add something on hover for all links
function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="text-md text-muted-gray-foreground font-medium titillium-web-light">
      {children}
    </Link>
  );
}

export interface DesktopNavbarProps {
  className: string;
  links: NavigationLink[];
}

export function DesktopNavbar({ className, links }: DesktopNavbarProps) {
  return (
    <div className={cn("hidden flex-1 items-center gap-6 titillium-web-light", className)}>
      {
        links.map(link => <NavLink key={link.key} href={link.href}>{link.children}</NavLink>)
      }
    </div>
  );
}