import "./globals.css";
import { Toaster } from "react-hot-toast";

import { LayoutFooter } from "~/components/general/layout-footer";
import { LayoutHeader } from "~/components/general/layout-header";
// import { Stars } from "~/components/general/stars";
import { Config } from "~/constants/config";
import { ApolloWrapper } from "~/lib/apollo-provider";

import type { ReactNode } from "react";



export const metadata = {
  title: {
    template: `${Config.SiteName} | %s`,
    default: Config.SiteName,
  },
  description: Config.SiteDescription,
};

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={"flex flex-col min-h-screen dark"}
      >
        <ApolloWrapper>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "var(--radius)",
                background: "var(--popover)",
                border: "2px solid var(--background)",
                color: "var(--popover-foreground)",
              },
            }}
          />
          <LayoutHeader />
          {/* <Stars /> */}
          <div className="flex flex-col flex-1">{children}</div>
          <LayoutFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
