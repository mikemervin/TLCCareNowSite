import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TLC CareNow",
    template: "%s | TLC CareNow",
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: site.name,
    description: site.tagline,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#28652b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteAnalytics />
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
