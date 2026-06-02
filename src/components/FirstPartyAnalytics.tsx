"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/client";

function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const key = query ? `${pathname}?${query}` : pathname;

    if (lastKey.current === key) return;
    lastKey.current = key;

    trackPageView(pathname);
  }, [pathname, searchParams]);

  return null;
}

export function FirstPartyAnalytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") {
    return null;
  }

  return <AnalyticsPageViewTracker />;
}
