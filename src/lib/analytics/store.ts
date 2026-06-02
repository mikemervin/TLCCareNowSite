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
import type { AnalyticsEvent, AnalyticsSummary } from "@/lib/analytics/types";

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
  const pageviews = events.filter((e) => e.type === "pageview");
  const customEvents = events.filter((e) => e.type === "event");

  const pathCounts = new Map<string, number>();
  for (const event of pageviews) {
    pathCounts.set(event.path, (pathCounts.get(event.path) ?? 0) + 1);
  }

  const topPaths = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([path, count]) => ({ path, count }));

  const dayCounts = new Map<string, number>();
  for (const event of events) {
    const date = event.timestamp.slice(0, 10);
    dayCounts.set(date, (dayCounts.get(date) ?? 0) + 1);
  }

  const eventsByDay = [...dayCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, count]) => ({ date, count }));

  return {
    storage,
    totalEvents: events.length,
    pageviews: pageviews.length,
    customEvents: customEvents.length,
    uniquePaths: pathCounts.size,
    topPaths,
    eventsByDay,
    recent: [...events].reverse().slice(0, 50),
  };
}
