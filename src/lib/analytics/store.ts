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
  useBlobAnalyticsStore,
} from "@/lib/analytics/config";
import {
  buildFormFunnels,
  buildTopActions,
} from "@/lib/analytics/event-catalog";
import { buildFormEntrySnapshots } from "@/lib/analytics/form-snapshots";
import { buildTodayStats } from "@/lib/analytics/today";
import { formatCountry, formatReferrer } from "@/lib/analytics/format";
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

    const lines = contents.trimEnd().split("\n");
    const keep = lines.slice(-Math.floor(lines.length * 0.75));
    await writeFile(filePath, `${keep.join("\n")}\n`, "utf8");
  } catch {
    /* file may not exist yet */
  }
}

export async function appendAnalyticsEvent(
  event: Omit<AnalyticsEvent, "id">,
): Promise<AnalyticsEvent> {
  if (useBlobAnalyticsStore()) {
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
  if (useBlobAnalyticsStore()) {
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
  storage: AnalyticsSummary["storage"] = useBlobAnalyticsStore() ? "blob" : "file",
): AnalyticsSummary {
  const excludedAdminViews = events.filter(
    (e) => e.type === "pageview" && isAdminPath(e.path),
  ).length;
  const marketing = publicMarketingEvents(events);

  const pageviews = marketing.filter((e) => e.type === "pageview");
  const customEvents = marketing.filter((e) => e.type === "event");

  const pathCounts = new Map<string, number>();
  for (const event of pageviews) {
    pathCounts.set(event.path, (pathCounts.get(event.path) ?? 0) + 1);
  }

  const topPaths = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([path, count]) => ({ path, count }));

  const dayCounts = new Map<string, number>();
  for (const event of marketing) {
    const date = event.timestamp.slice(0, 10);
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

  const topCountries = topCounts(pageviews.map((e) => e.country), (raw) =>
    formatCountry(raw),
  );

  const reversed = [...marketing].reverse();
  const formInputs = marketing.filter((e) => e.type === "form_input");

  return {
    storage,
    excludedAdminViews,
    today: buildTodayStats(marketing),
    totalEvents: marketing.length,
    pageviews: pageviews.length,
    customEvents: customEvents.length,
    uniquePaths: pathCounts.size,
    topPaths,
    topReferrers,
    topCountries,
    formFunnels: buildFormFunnels(marketing),
    topActions: buildTopActions(marketing),
    eventsByDay,
    recent: reversed.filter((e) => e.type !== "form_input").slice(0, 50),
    recentFormEvents: reversed
      .filter((e) => e.type === "event")
      .slice(0, 30),
    formEntries: buildFormEntrySnapshots(marketing),
    recentFieldUpdates: [...formInputs].reverse().slice(0, 40),
  };
}
