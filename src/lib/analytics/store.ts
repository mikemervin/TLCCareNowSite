import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  appendAnalyticsEventBlob,
  readAnalyticsEventsBlob,
} from "@/lib/analytics/blob-store";
import {
  analyticsEventsPath,
  ANALYTICS_MAX_EVENTS_FILE_BYTES,
  analyticsStorageBackend,
} from "@/lib/analytics/config";
import {
  appendAnalyticsEventPostgres,
  readAnalyticsEventsPostgres,
} from "@/lib/analytics/postgres-store";
import { trimJsonlToMaxBytes } from "@/lib/analytics/jsonl-trim";
import {
  buildFormFunnels,
  buildTopActions,
} from "@/lib/analytics/event-catalog";
import { buildFormEntrySnapshots } from "@/lib/analytics/form-snapshots";
import { buildActiveNowStats, isPresenceEvent } from "@/lib/analytics/active-now";
import { buildTodayStats, eventSiteDateKey } from "@/lib/analytics/today";
import { formatLocation, formatReferrer } from "@/lib/analytics/format";
import {
  buildDeviceBreakdown,
  buildKnownPageCounts,
  buildLeadStats,
  buildOutboundClicks,
  buildPeakHours,
  buildSessionStats,
  buildUtmCampaigns,
  marketingPageviews,
} from "@/lib/analytics/insights";
import {
  canonicalAnalyticsPath,
  pathTrafficCategory,
} from "@/lib/analytics/page-labels";
import type { FormSubmission } from "@/lib/analytics/submissions-types";
import type {
  AnalyticsEvent,
  AnalyticsSummary,
  CountRow,
} from "@/lib/analytics/types";

function isAdminPath(path: string): boolean {
  const base = path.split("?")[0] ?? path;
  return base === "/admin" || base.startsWith("/admin/");
}

function publicMarketingEvents(events: AnalyticsEvent[]): AnalyticsEvent[] {
  return events.filter((e) => !isAdminPath(e.path));
}

function topCounts(
  items: Iterable<string | null>,
  labelFn: (raw: string) => string,
  limit = 10,
): CountRow[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!item) continue;
    const label = labelFn(item);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

async function ensureDataDir(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function trimFileIfNeeded(filePath: string): Promise<void> {
  try {
    const contents = await readFile(filePath, "utf8");
    if (contents.length <= ANALYTICS_MAX_EVENTS_FILE_BYTES) return;
    await writeFile(
      filePath,
      trimJsonlToMaxBytes(contents, ANALYTICS_MAX_EVENTS_FILE_BYTES),
      "utf8",
    );
  } catch {
    /* file may not exist yet */
  }
}

export async function appendAnalyticsEvent(
  event: Omit<AnalyticsEvent, "id">,
): Promise<AnalyticsEvent> {
  const backend = analyticsStorageBackend();
  if (backend === "postgres") {
    return appendAnalyticsEventPostgres(event);
  }
  if (backend === "blob") {
    return appendAnalyticsEventBlob(event);
  }

  const filePath = analyticsEventsPath();
  await ensureDataDir(filePath);
  await trimFileIfNeeded(filePath);

  const record: AnalyticsEvent = { id: randomUUID(), ...event };
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

export async function readAnalyticsEvents(limit = 5000): Promise<AnalyticsEvent[]> {
  const backend = analyticsStorageBackend();
  if (backend === "postgres") {
    return readAnalyticsEventsPostgres(limit);
  }
  if (backend === "blob") {
    return readAnalyticsEventsBlob(limit);
  }

  const filePath = analyticsEventsPath();

  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    return [];
  }

  const events: AnalyticsEvent[] = [];
  for (const line of raw.trimEnd().split("\n")) {
    if (!line) continue;
    try {
      events.push(JSON.parse(line) as AnalyticsEvent);
    } catch {
      /* skip corrupt lines */
    }
  }

  return events.slice(-limit);
}

export function buildAnalyticsSummary(
  events: AnalyticsEvent[],
  storage: AnalyticsSummary["storage"] = analyticsStorageBackend(),
  submissions: FormSubmission[] = [],
): AnalyticsSummary {
  const excludedAdminViews = events.filter(
    (e) => e.type === "pageview" && isAdminPath(e.path),
  ).length;
  const marketing = publicMarketingEvents(events);
  const signals = marketing.filter((e) => !isPresenceEvent(e));

  const pageviews = signals.filter((e) => e.type === "pageview");
  const customEvents = signals.filter((e) => e.type === "event");

  const pathCounts = new Map<string, number>();
  for (const event of pageviews) {
    const path = canonicalAnalyticsPath(event.path);
    pathCounts.set(path, (pathCounts.get(path) ?? 0) + 1);
  }

  const knownPathRows: { path: string; count: number }[] = [];
  const noisePathRows: { path: string; count: number }[] = [];

  for (const [path, count] of pathCounts.entries()) {
    const row = { path, count };
    if (pathTrafficCategory(path) === "known") {
      knownPathRows.push(row);
    } else {
      noisePathRows.push(row);
    }
  }

  const topPaths = knownPathRows
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
  const noisePaths = noisePathRows
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const dayCounts = new Map<string, number>();
  for (const event of signals) {
    const date = eventSiteDateKey(event.timestamp);
    dayCounts.set(date, (dayCounts.get(date) ?? 0) + 1);
  }

  const eventsByDay = [...dayCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, count]) => ({ date, count }));

  const topReferrers = topCounts(
    pageviews.map((e) => e.referrer),
    (raw) => formatReferrer(raw),
  );

  const topLocations = topCounts(
    pageviews.map((e) =>
      formatLocation(e.country, e.city ?? null, e.region ?? null),
    ),
    (label) => label,
  );

  const reversed = [...signals].reverse();
  const formInputs = signals.filter((e) => e.type === "form_input");
  const formEntries = buildFormEntrySnapshots(signals);

  return {
    storage,
    excludedAdminViews,
    activeNow: buildActiveNowStats(events),
    today: buildTodayStats(marketing),
    totalEvents: signals.length,
    pageviews: pageviews.length,
    customEvents: customEvents.length,
    uniquePaths: pathCounts.size,
    topPaths,
    noisePaths,
    topReferrers,
    topLocations,
    blogRankings: buildKnownPageCounts(pageviews, { blogOnly: true, limit: 10 }),
    deviceBreakdown: buildDeviceBreakdown(pageviews),
    peakHours: buildPeakHours(pageviews),
    sessionStats: buildSessionStats(pageviews),
    utmCampaigns: buildUtmCampaigns(pageviews),
    outboundClicks: buildOutboundClicks(signals),
    leadStats: buildLeadStats(formEntries, submissions),
    formFunnels: buildFormFunnels(signals),
    topActions: buildTopActions(signals),
    eventsByDay,
    recent: reversed.filter((e) => e.type !== "form_input").slice(0, 50),
    recentFormEvents: reversed
      .filter((e) => e.type === "event")
      .slice(0, 30),
    formEntries,
    recentFieldUpdates: [...formInputs].reverse().slice(0, 40),
  };
}
