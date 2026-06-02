import { get, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { AnalyticsEvent } from "@/lib/analytics/types";

const BLOB_PATH = "analytics/events.jsonl";

function parseLines(raw: string): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];
  for (const line of raw.trimEnd().split("\n")) {
    if (!line) continue;
    try {
      events.push(JSON.parse(line) as AnalyticsEvent);
    } catch {
      /* skip corrupt lines */
    }
  }
  return events;
}

async function readBlobRaw(): Promise<string> {
  try {
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!result?.stream) return "";
    return await new Response(result.stream).text();
  } catch {
    return "";
  }
}

async function writeBlobRaw(content: string): Promise<void> {
  await put(BLOB_PATH, content, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/x-ndjson",
  });
}

export async function appendAnalyticsEventBlob(
  event: Omit<AnalyticsEvent, "id">,
): Promise<AnalyticsEvent> {
  const record: AnalyticsEvent = { id: randomUUID(), ...event };
  const existing = await readBlobRaw();
  const trimmed = existing.trimEnd();
  const next = trimmed
    ? `${trimmed}\n${JSON.stringify(record)}\n`
    : `${JSON.stringify(record)}\n`;
  await writeBlobRaw(next);
  return record;
}

export async function readAnalyticsEventsBlob(
  limit = 5000,
): Promise<AnalyticsEvent[]> {
  const raw = await readBlobRaw();
  if (!raw.trim()) return [];
  return parseLines(raw).slice(-limit);
}
