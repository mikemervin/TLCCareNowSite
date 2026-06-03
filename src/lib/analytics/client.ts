"use client";

import type { AnalyticsEventType } from "@/lib/analytics/types";

const ENDPOINT = "/api/analytics";

function canTrack(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

function send(payload: {
  type: AnalyticsEventType;
  path: string;
  name?: string;
  referrer?: string;
}): void {
  if (!canTrack()) return;
  if (typeof window === "undefined") return;
  if (window.navigator.doNotTrack === "1") return;

  const body = JSON.stringify({
    ...payload,
    referrer: payload.referrer ?? (document.referrer || null),
  });

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  });
}

export function trackPageView(path: string): void {
  send({ type: "pageview", path });
}

/** Track button clicks and other actions, e.g. trackEvent("cta_demo", { path: "/enterprise" }) */
export function trackEvent(
  name: string,
  options?: { path?: string },
): void {
  const path =
    options?.path ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  send({ type: "event", path, name });
}
