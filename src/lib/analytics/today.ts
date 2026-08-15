import { isPresenceEvent } from "@/lib/analytics/active-now";
import { formatLocation } from "@/lib/analytics/format";
import {
  buildDeviceBreakdown,
  buildKnownPageCounts,
  buildOutboundClicks,
  buildPeakHours,
  buildSessionStats,
  buildUtmCampaigns,
  marketingPageviews,
  todayMarketingEvents,
} from "@/lib/analytics/insights";
import { getSiteTimezone } from "@/lib/analytics/timezone";
import type {
  AnalyticsEvent,
  CountRow,
  DayBriefStats,
  TodayStats,
} from "@/lib/analytics/types";

export function siteTodayDateKey(when = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: getSiteTimezone(),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(when);
}

export function eventSiteDateKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: getSiteTimezone(),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function formatSiteTodayLabel(dateKey: string): string {
  const parsed = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateKey;
  return parsed.toLocaleDateString("en-US", {
    timeZone: getSiteTimezone(),
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Display timestamps in site timezone (server runs in UTC on Vercel). */
export function formatSiteWhen(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString("en-US", {
    timeZone: getSiteTimezone(),
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatSiteDateKeyLabel(dateKey: string): string {
  const parsed = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateKey;
  return parsed.toLocaleDateString("en-US", {
    timeZone: getSiteTimezone(),
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
      const fp = `${event.city ?? ""}|${event.region ?? ""}|${event.country ?? "?"}|${event.userAgent ?? "?"}`;
      fingerprints.add(fp);
    }
  }

  if (sessions.size > 0) return sessions.size;
  return fingerprints.size;
}

function sessionKey(event: AnalyticsEvent): string | null {
  if (event.sessionId) return event.sessionId;
  if (event.type === "pageview") {
    return `fp:${event.city ?? ""}|${event.region ?? ""}|${event.country ?? "?"}|${event.userAgent ?? "?"}`;
  }
  return null;
}

/** One location per session today (uses the latest event with geo for that session). */
export function buildTodayVisitorsByLocation(
  events: AnalyticsEvent[],
  limit = 15,
): CountRow[] {
  const todayKey = siteTodayDateKey();
  const todayEvents = events.filter(
    (e) =>
      eventSiteDateKey(e.timestamp) === todayKey && !isPresenceEvent(e),
  );

  const sessionLocation = new Map<string, string>();
  const sorted = [...todayEvents].sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp),
  );

  for (const event of sorted) {
    const key = sessionKey(event);
    if (!key) continue;
    const label = formatLocation(
      event.country,
      event.city ?? null,
      event.region ?? null,
    );
    if (label === "—") continue;
    sessionLocation.set(key, label);
  }

  const counts = new Map<string, number>();
  for (const label of sessionLocation.values()) {
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

const OUTBOUND_PREFIX = "outbound_";

/** Site-calendar YYYY-MM-DD keys for the last `days` days, oldest → today. */
export function pastSiteDateKeys(days: number, when = new Date()): string[] {
  const todayKey = siteTodayDateKey(when);
  const [year, month, day] = todayKey.split("-").map(Number);
  const utcNoon = Date.UTC(year, month - 1, day, 12, 0, 0);
  const keys: string[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const point = new Date(utcNoon - i * 24 * 60 * 60 * 1000);
    const y = point.getUTCFullYear();
    const m = String(point.getUTCMonth() + 1).padStart(2, "0");
    const d = String(point.getUTCDate()).padStart(2, "0");
    keys.push(`${y}-${m}-${d}`);
  }

  return keys;
}

function dayBriefStatsForKey(
  events: AnalyticsEvent[],
  dateKey: string,
  todayKey: string,
): DayBriefStats {
  const dayEvents = events.filter(
    (e) => !isPresenceEvent(e) && eventSiteDateKey(e.timestamp) === dateKey,
  );
  const dayPageviews = marketingPageviews(dayEvents);
  const appClicks = dayEvents.filter(
    (e) => e.type === "event" && e.name?.startsWith(OUTBOUND_PREFIX),
  ).length;

  return {
    dateKey,
    dateLabel: formatSiteTodayLabel(dateKey),
    isToday: dateKey === todayKey,
    visitors: uniqueVisitorCount(dayEvents),
    pageviews: dayPageviews.length,
    formActions: dayEvents.filter(
      (e) =>
        e.type === "event" && !e.name?.startsWith(OUTBOUND_PREFIX),
    ).length,
    appClicks,
  };
}

/** Last 7 site days ending today: people, pages, forms, and app clicks. */
export function buildPastWeekDays(
  events: AnalyticsEvent[],
  days = 7,
): DayBriefStats[] {
  const todayKey = siteTodayDateKey();
  return pastSiteDateKeys(days).map((dateKey) =>
    dayBriefStatsForKey(events, dateKey, todayKey),
  );
}

export function buildTodayStats(events: AnalyticsEvent[]): TodayStats {
  const todayKey = siteTodayDateKey();
  const todayEvents = todayMarketingEvents(events);
  const todayPageviews = marketingPageviews(todayEvents);
  const appClicks = buildOutboundClicks(todayEvents, { todayOnly: true }).reduce(
    (sum, row) => sum + row.count,
    0,
  );

  return {
    dateKey: todayKey,
    dateLabel: formatSiteTodayLabel(todayKey),
    pageviews: todayPageviews.length,
    visitors: uniqueVisitorCount(todayEvents),
    formActions: todayEvents.filter((e) => e.type === "event").length,
    totalEvents: todayEvents.length,
    visitorsByLocation: buildTodayVisitorsByLocation(events),
    topPages: buildKnownPageCounts(todayPageviews, { todayOnly: true, limit: 8 }),
    blogPages: buildKnownPageCounts(todayPageviews, {
      todayOnly: true,
      blogOnly: true,
      limit: 8,
    }),
    deviceBreakdown: buildDeviceBreakdown(todayPageviews),
    peakHours: buildPeakHours(todayPageviews),
    sessionStats: buildSessionStats(todayPageviews),
    utmCampaigns: buildUtmCampaigns(todayPageviews),
    appClicks,
  };
}
