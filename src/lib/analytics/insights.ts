import { isPresenceEvent } from "@/lib/analytics/active-now";
import {
  analyticsPageLabel,
  canonicalAnalyticsPath,
  pathTrafficCategory,
} from "@/lib/analytics/page-labels";
import { isLikelySpamText } from "@/lib/analytics/spam";
import { getSiteTimezone } from "@/lib/analytics/timezone";
import { eventSiteDateKey, siteTodayDateKey } from "@/lib/analytics/today";
import type {
  ActionCount,
  AnalyticsEvent,
  CountRow,
  FormEntrySnapshot,
  LeadStats,
  SessionStats,
} from "@/lib/analytics/types";
import type { FormSubmission } from "@/lib/analytics/submissions-types";
import { eventDisplayName } from "@/lib/analytics/event-catalog";

export type DeviceClass = "Mobile" | "Desktop" | "Tablet" | "Unknown";

const OUTBOUND_PREFIX = "outbound_";

export function sessionIdFromEvent(event: AnalyticsEvent): string | null {
  if (event.sessionId) return event.sessionId;
  if (event.type === "pageview") {
    return `fp:${event.city ?? ""}|${event.region ?? ""}|${event.country ?? "?"}|${event.userAgent ?? "?"}`;
  }
  return null;
}

export function deviceClassFromUa(userAgent: string | null): DeviceClass {
  if (!userAgent) return "Unknown";
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|Android|iPhone|iPod/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function eventSiteHour(iso: string): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: getSiteTimezone(),
    hour: "numeric",
    hour12: false,
  }).format(new Date(iso));
  return Number(hour);
}

function formatHourLabel(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString("en-US", {
    timeZone: getSiteTimezone(),
    hour: "numeric",
  });
}

function toCountRows(
  counts: Map<string, number>,
  limit = 10,
): CountRow[] {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

export function buildSessionStats(pageviews: AnalyticsEvent[]): SessionStats {
  const bySession = new Map<string, number>();

  for (const event of pageviews) {
    const key = sessionIdFromEvent(event);
    if (!key) continue;
    bySession.set(key, (bySession.get(key) ?? 0) + 1);
  }

  const sessions = bySession.size;
  if (sessions === 0) {
    return { sessions: 0, bounceRatePct: 0, avgPagesPerVisit: 0 };
  }

  const pageCounts = [...bySession.values()];
  const bounces = pageCounts.filter((count) => count === 1).length;
  const totalPages = pageCounts.reduce((sum, count) => sum + count, 0);

  return {
    sessions,
    bounceRatePct: Math.round((bounces / sessions) * 100),
    avgPagesPerVisit: Math.round((totalPages / sessions) * 10) / 10,
  };
}

export function buildDeviceBreakdown(
  events: AnalyticsEvent[],
  limit = 5,
): CountRow[] {
  const sessionDevice = new Map<string, DeviceClass>();
  const sorted = [...events].sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp),
  );

  for (const event of sorted) {
    if (event.type !== "pageview") continue;
    const key = sessionIdFromEvent(event);
    if (!key || sessionDevice.has(key)) continue;
    sessionDevice.set(key, deviceClassFromUa(event.userAgent));
  }

  const counts = new Map<string, number>();
  for (const device of sessionDevice.values()) {
    counts.set(device, (counts.get(device) ?? 0) + 1);
  }

  return toCountRows(counts, limit);
}

export function buildPeakHours(
  pageviews: AnalyticsEvent[],
  limit = 8,
): CountRow[] {
  const counts = new Map<string, number>();

  for (const event of pageviews) {
    const hour = eventSiteHour(event.timestamp);
    const label = formatHourLabel(hour);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return toCountRows(counts, limit);
}

export function parseUtmCampaign(path: string): string | null {
  const query = path.split("?")[1];
  if (!query) return null;

  const params = new URLSearchParams(query);
  const source = params.get("utm_source");
  if (!source?.trim()) return null;

  const parts = [source.trim()];
  const medium = params.get("utm_medium")?.trim();
  const campaign = params.get("utm_campaign")?.trim();
  if (medium) parts.push(medium);
  if (campaign) parts.push(campaign);
  return parts.join(" / ");
}

export function buildUtmCampaigns(
  pageviews: AnalyticsEvent[],
  limit = 10,
): CountRow[] {
  const counts = new Map<string, number>();

  for (const event of pageviews) {
    const label = parseUtmCampaign(event.path);
    if (!label) continue;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return toCountRows(counts, limit);
}

export function buildKnownPageCounts(
  pageviews: AnalyticsEvent[],
  options?: {
    todayOnly?: boolean;
    blogOnly?: boolean;
    limit?: number;
  },
): CountRow[] {
  const todayKey = siteTodayDateKey();
  const counts = new Map<string, number>();

  for (const event of pageviews) {
    if (options?.todayOnly && eventSiteDateKey(event.timestamp) !== todayKey) {
      continue;
    }

    const path = canonicalAnalyticsPath(event.path);
    if (pathTrafficCategory(path) !== "known") continue;
    if (options?.blogOnly && !path.startsWith("/blog/")) continue;
    if (options?.blogOnly && path === "/blog") continue;

    const label = options?.blogOnly
      ? path.replace("/blog/", "") || analyticsPageLabel(path)
      : analyticsPageLabel(path);

    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return toCountRows(counts, options?.limit ?? 10);
}

export function buildOutboundClicks(
  events: AnalyticsEvent[],
  options?: { todayOnly?: boolean; limit?: number },
): ActionCount[] {
  const todayKey = siteTodayDateKey();
  const counts = new Map<string, number>();

  for (const event of events) {
    if (event.type !== "event" || !event.name?.startsWith(OUTBOUND_PREFIX)) {
      continue;
    }
    if (
      options?.todayOnly &&
      eventSiteDateKey(event.timestamp) !== todayKey
    ) {
      continue;
    }
    counts.set(event.name, (counts.get(event.name) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, options?.limit ?? 12)
    .map(([name, count]) => ({
      name,
      label: eventDisplayName(name),
      count,
    }));
}

export function buildLeadStats(
  entries: FormEntrySnapshot[],
  submissions: FormSubmission[],
): LeadStats {
  let likelySpamDrafts = 0;
  for (const entry of entries) {
    if (isLikelySpamText(...entry.fields.map((field) => field.value))) {
      likelySpamDrafts += 1;
    }
  }

  let likelySpamSends = 0;
  for (const sub of submissions) {
    if (
      isLikelySpamText(sub.name, sub.email, sub.subject, sub.message, sub.phone)
    ) {
      likelySpamSends += 1;
    }
  }

  const sentCount = submissions.length;
  return {
    draftCount: entries.length,
    sentCount,
    likelySpamDrafts,
    likelySpamSends,
    realSends: Math.max(0, sentCount - likelySpamSends),
  };
}

export function marketingPageviews(events: AnalyticsEvent[]): AnalyticsEvent[] {
  return events.filter(
    (e) => e.type === "pageview" && !isPresenceEvent(e),
  );
}

export function todayMarketingEvents(events: AnalyticsEvent[]): AnalyticsEvent[] {
  const todayKey = siteTodayDateKey();
  return events.filter(
    (e) =>
      !isPresenceEvent(e) && eventSiteDateKey(e.timestamp) === todayKey,
  );
}
