import Script from "next/script";

export const ADSENSE_PUBLISHER_ID = "ca-pub-3623881539522121";
export const ADSENSE_HEALTH_SLOT = "2155293531";

export function BlogAdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
