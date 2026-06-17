import { BlobFileTooLargeError, get, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { ANALYTICS_MAX_BLOB_BYTES } from "@/lib/analytics/config";
import { trimJsonlToMaxBytes } from "@/lib/analytics/jsonl-trim";
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

function appendJsonlLine(existing: string, line: string): string {
  const base = trimJsonlToMaxBytes(existing, ANALYTICS_MAX_BLOB_BYTES).trimEnd();
  return base ? `${base}\n${line}\n` : `${line}\n`;
}

export async function appendAnalyticsEventBlob(
  event: Omit<AnalyticsEvent, "id">,
): Promise<AnalyticsEvent> {
  const record: AnalyticsEvent = { id: randomUUID(), ...event };
  const line = JSON.stringify(record);
  const existing = await readBlobRaw();
  let next = appendJsonlLine(existing, line);

  try {
    await writeBlobRaw(next);
    return record;
  } catch (error) {
    if (!(error instanceof BlobFileTooLargeError)) throw error;

    next = appendJsonlLine(
      trimJsonlToMaxBytes(existing, Math.floor(ANALYTICS_MAX_BLOB_BYTES * 0.5)),
      line,
    );
    await writeBlobRaw(next);
    return record;
  }
}

export async function readAnalyticsEventsBlob(
  limit = 5000,
): Promise<AnalyticsEvent[]> {
  const raw = await readBlobRaw();
  if (!raw.trim()) return [];
  return parseLines(raw).slice(-limit);
}
