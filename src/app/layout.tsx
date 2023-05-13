import "./globals.css";
import { Inter } from "next/font/google";

import { Config } from "~/constants/config";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: `${Config.SiteName} | %s`,
    default: Config.SiteName,
  },
  description: Config.SiteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
