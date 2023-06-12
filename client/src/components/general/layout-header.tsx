import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


import LogoPng from "~/assets/logo.png";

import { Button } from "../ui/button";

import type { ReactNode } from "react";


interface NavLinkProps {
  href: string;
  children?: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="text-md text-muted-gray-foreground font-medium">
      {children}
    </Link>
  );
}

export function LayoutHeader() {
  return (
    <div className="flex justify-center py-2 px-4 push-in-bottom bg-background-inset">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Left Side */}
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={LogoPng} alt="MakeUC Logo" width="54" height="54" />
          </Link>

          {/* Center */}
          <div className="hidden flex-1 items-center gap-6 md:flex">
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Tracks</NavLink>
            <NavLink href="#">FAQ</NavLink>
            <NavLink href="#">Sponsors</NavLink>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-end items-center gap-4">
          <Link
            href="/registration"
          >
            <Button className="flex gap-2" size="sm">Register<Edit size="16px" /></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}