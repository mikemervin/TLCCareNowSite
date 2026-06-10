"use client";

import type { AnalyticsEventType } from "@/lib/analytics/types";

const ENDPOINT = "/api/analytics";
const SESSION_KEY = "tlc_form_analytics_session";

function canTrack(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

/** One session id per browser tab visit (forms + page views). */
export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `s-${Date.now()}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `s-${Date.now()}`;
  }
}

function send(payload: Record<string, unknown>): void {
  if (!canTrack()) return;
  if (typeof window === "undefined") return;
  if (window.navigator.doNotTrack === "1") return;

  const body = JSON.stringify({
    ...payload,
    pageTitle: payload.pageTitle ?? (document.title || null),
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
  send({
    type: "pageview",
    path,
    sessionId: getAnalyticsSessionId(),
  });
}

/** Keeps the session counted as "online" while the tab is open (about every 45s). */
export function trackPresence(path: string): void {
  send({
    type: "heartbeat",
    path,
    sessionId: getAnalyticsSessionId(),
  });
}

/** @deprecated Use getAnalyticsSessionId */
export const getFormAnalyticsSessionId = getAnalyticsSessionId;

/** Clicks to app.tlccarenow.com and other outbound booking links. */
export function trackOutboundClick(
  clickId: string,
  options?: { path?: string },
): void {
  trackEvent(`outbound_${clickId}`, options);
}

/** Track button clicks and other actions, e.g. trackEvent("cta_demo", { path: "/enterprise" }) */
export function trackEvent(
  name: string,
  options?: { path?: string },
): void {
  const path =
    options?.path ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  send({ type: "event", path, name, sessionId: getAnalyticsSessionId() });
}

/** Debounced field typing — visible in admin analytics (not sent on every key). */
export function trackFormFieldInput(
  formId: string,
  field: string,
  value: string,
  options?: { path?: string },
): void {
  const path =
    options?.path ??
    (typeof window !== "undefined" ? window.location.pathname : "/");

  send({
    type: "form_input",
    path,
    formId,
    field,
    value,
    sessionId: getAnalyticsSessionId(),
  });
}
