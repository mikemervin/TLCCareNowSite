import { get, put } from "@vercel/blob";
import type { FormSubmission } from "@/lib/analytics/submissions-types";

const BLOB_PATH = "analytics/submissions.jsonl";

function parseLines(raw: string): FormSubmission[] {
  const rows: FormSubmission[] = [];
  for (const line of raw.trimEnd().split("\n")) {
    if (!line) continue;
    try {
      rows.push(JSON.parse(line) as FormSubmission);
    } catch {
      /* skip corrupt lines */
    }
  }
  return rows;
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

export async function appendFormSubmissionBlob(
  row: FormSubmission,
): Promise<void> {
  const existing = await readBlobRaw();
  const trimmed = existing.trimEnd();
  const next = trimmed
    ? `${trimmed}\n${JSON.stringify(row)}\n`
    : `${JSON.stringify(row)}\n`;
  await writeBlobRaw(next);
}

export async function readFormSubmissionsBlob(
  limit = 200,
): Promise<FormSubmission[]> {
  const raw = await readBlobRaw();
  if (!raw.trim()) return [];
  return parseLines(raw).slice(-limit);
}
