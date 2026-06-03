import { isPresenceEvent } from "@/lib/analytics/active-now";
import type { AnalyticsEvent, TodayStats } from "@/lib/analytics/types";

const SITE_TIMEZONE = "America/Chicago";

export function siteTodayDateKey(when = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(when);
}

export function eventSiteDateKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function formatSiteTodayLabel(dateKey: string): string {
  const parsed = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateKey;
  return parsed.toLocaleDateString("en-US", {
    timeZone: SITE_TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function uniqueVisitorCount(events: AnalyticsEvent[]): number {
  const sessions = new Set<string>();
  const fingerprints = new Set<string>();

  for (const event of events) {
    if (event.sessionId) {
      sessions.add(event.sessionId);
      continue;
    }
    if (event.type === "pageview") {
      const fp = `${event.country ?? "?"}|${event.userAgent ?? "?"}`;
      fingerprints.add(fp);
    }
  }

  if (sessions.size > 0) return sessions.size;
  return fingerprints.size;
}

export function buildTodayStats(events: AnalyticsEvent[]): TodayStats {
  const todayKey = siteTodayDateKey();
  const todayEvents = events.filter(
    (e) =>
      eventSiteDateKey(e.timestamp) === todayKey && !isPresenceEvent(e),
  );
  const todayPageviews = todayEvents.filter((e) => e.type === "pageview");

  return {
    dateKey: todayKey,
    dateLabel: formatSiteTodayLabel(todayKey),
    pageviews: todayPageviews.length,
    visitors: uniqueVisitorCount(todayEvents),
    formActions: todayEvents.filter((e) => e.type === "event").length,
    totalEvents: todayEvents.length,
  };
}
