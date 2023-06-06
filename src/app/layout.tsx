import "./globals.css";
import { Inter } from "next/font/google";

import { LayoutHeader } from "~/components/general/layout-header";
import { Config } from "~/constants/config";

import type { ReactNode } from "react";



const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <LayoutHeader />
        {children}
      </body>
    </html>
  );
}
