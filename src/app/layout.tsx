import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased font-sans", ...fontVariables)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
