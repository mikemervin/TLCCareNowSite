"use client";

import { useCallback, useRef } from "react";
import { trackEvent } from "@/lib/analytics/client";

/** Fire a single “form started” event per mount when the user first focuses the form. */
export function useFormStartedAnalytics(
  eventName: string,
  path?: string,
): () => void {
  const fired = useRef(false);

  return useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    const page =
      path ??
      (typeof window !== "undefined" ? window.location.pathname : "/");
    trackEvent(eventName, { path: page });
  }, [eventName, path]);
}
