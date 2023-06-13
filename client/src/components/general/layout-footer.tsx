import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

import type { ReactNode } from "react";


interface FooterLinkProps {
  href: string;
  target?: string;
  children?: ReactNode;
}

function FooterLink({ children, ...props }: FooterLinkProps) {
  return (
    <Link {...props} className="text-sm text-medium text-muted-gray-foreground">
      {children}
    </Link>
  );
}

export function LayoutFooter() {
  return (
    <div className="mt-16 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between bg-muted min-h-[3rem] px-8 py-4">
      <div className="flex gap-7">
        <FooterLink href="#">Privacy</FooterLink>
        <FooterLink href="#">Terms</FooterLink>
        <FooterLink target="_blank" href="https://mlh.io/code-of-conduct">Code of Conduct</FooterLink>
      </div>
      <div className="flex gap-7">
        <FooterLink target="_blank" href="https://twitter.com/makeuc_io"><Twitter /></FooterLink>
        <FooterLink target="_blank" href="https://instagram.com/makeuc.io"><Instagram /></FooterLink>
        <FooterLink target="_blank" href="https://www.linkedin.com/company/makeuc/?viewAsMember=true"><Linkedin /></FooterLink>
        <FooterLink target="_blank" href="https://github.com/makeuc"><Github /></FooterLink>
        <FooterLink target="_blank" href="mailto:contact@makeuc.io"><Mail /></FooterLink>
      </div>
    </div>
  );
}