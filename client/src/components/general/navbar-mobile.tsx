"use client";

import { Menu, X, Edit, CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import LogoPng from "~/assets/logo.png";
import { Config } from "~/constants/config";
import { cn } from "~/utils/className";

import { Button } from "../ui/button";

import type { NavigationLink } from "./layout-header";
import type { ReactNode } from "react";



interface NavLinkProps {
  href: string;
  children?: ReactNode;
  onClick?: () => void;
}

// TODO: Add something on hover for all links
function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link href={href} onClick={onClick} className="text-2xl text-foreground font-semibold">
      {children}
    </Link>
  );
}

export interface MobileNavbarProps {
  className?: string;
  links: NavigationLink[];
}

export function MobileNavbar({ className, links }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  return (
    <>
      <button className={className} onClick={() => setIsMenuOpen(true)}><Menu size="32px" className="text-muted-gray-foreground" /></button>
      {
        isMenuOpen &&
        <div className={cn("fixed flex flex-col items-center top-0 left-0 w-screen h-screen bg-background overflow-y-auto gap-6 p-6", className)}>
          <button className="self-end mr-7" onClick={() => setIsMenuOpen(false)}><X /></button>
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <Image src={LogoPng} alt="MakeUC Logo" width="128" height="128" />
          </Link>

          {
            links.map(link => (
              <NavLink
                key={link.key}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >{link.children}</NavLink>
            ))
          }
          {Config.ShowRegistration && (<Link href="/registration" tabIndex={-1} onClick={() => setIsMenuOpen(false)}>
            <Button className="flex gap-2 text-xl" size="lg">Register<Edit size="20px" /></Button>
          </Link>)}
          {/*<Link href="/live" tabIndex={-1} onClick={() => setIsMenuOpen(false)}>
            <Button className="flex gap-2" size="sm">Live Site<CalendarCheck size="20px" /></Button>
          </Link>*/}
        </div>
      }
    </>
  );
}
