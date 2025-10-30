import { Edit, CalendarCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Config } from "~/constants/config";

import { Logo } from "../ui/Logo";

import { MLHBanner } from "./mlh-banner";
import { DesktopNavbar } from "./navbar-desktop";
import { MobileNavbar } from "./navbar-mobile";

import type { ReactNode } from "react";


export interface NavigationLink {
  key: string;
  href: string;
  children: ReactNode;
}

const LINKS: NavigationLink[] = [
  { key: "about", href: "/about", children: "About" },
  { key: "tracks", href: "/tracks", children: "Tracks" },
  { key: "faq", href: "/faq", children: "FAQ" },
  // { key: "live", href: "/live", children: "Live Site" },
  // { key: "sponsors", href: "#", children: "Sponsors" },
];

export function LayoutHeader() {
  return (
    <div className="flex justify-center py-2 px-4 push-in-bottom bg-background-inset sticky top-0 z-10">
      <nav className="flex items-center justify-between gap-4 w-full">
        {/* Left Side */}
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo width={54} />
          </Link>

          <DesktopNavbar className="sm:flex" links={LINKS} />
        </div>

        {/* Right Side */}
        <div className="flex justify-end items-center gap-4">
          {Config.ShowRegistration && (<Link href="/registration" className="hidden sm:block" tabIndex={-1}>
            <Button className="flex gap-2" size="sm">Register<Edit size="16px" /></Button>
          </Link>)}
          
          <Link href="/live" className="hidden sm:block" tabIndex={-1}>
            <Button className="flex gap-2" size="sm">
              Live Site!
              <CalendarCheck size="16px" />
            </Button>
          </Link>
          <MobileNavbar className="sm:hidden" links={LINKS} />
          {Config.ShowMLHBanner && (<div className="self-end">
            <div className="relative -bottom-4">
              <MLHBanner />
            </div>
          </div>)}
        </div>
      </nav>
    </div>
  );
}
