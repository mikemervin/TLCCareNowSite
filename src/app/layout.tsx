import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { BlogAdSense, ADSENSE_PUBLISHER_ID } from "@/components/BlogAdSense";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { SiteJsonLd } from "@/components/SiteJsonLd";
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
  applicationName: "TLC",
  appleWebApp: {
    capable: true,
    title: "TLC",
    statusBarStyle: "default",
  },
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
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "google-adsense-account": ADSENSE_PUBLISHER_ID,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <BlogAdSense />
        <SiteJsonLd />
        <SiteAnalytics />
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
