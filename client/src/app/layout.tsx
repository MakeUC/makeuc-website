import "./globals.css";
import { Montserrat } from "next/font/google";

import { LayoutFooter } from "~/components/general/layout-footer";
import { LayoutHeader } from "~/components/general/layout-header";
import { Config } from "~/constants/config";

import type { ReactNode } from "react";



const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: `${Config.SiteName} | %s`,
    default: Config.SiteName,
  },
  description: Config.SiteDescription,
};

export interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <LayoutHeader />
        <div className="flex flex-col">
          {children}
        </div>
        <LayoutFooter />
      </body>
    </html>
  );
}
