import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { analyticsSubmissionsPath, useBlobAnalyticsStore } from "@/lib/analytics/config";
import {
  appendFormSubmissionBlob,
  readFormSubmissionsBlob,
} from "@/lib/analytics/submissions-blob";
import type {
  FormSubmission,
  FormSubmissionSource,
} from "@/lib/analytics/submissions-types";

const MAX_SUBMISSIONS_FILE_BYTES = 2 * 1024 * 1024;

export type NewFormSubmission = {
  source: FormSubmissionSource;
  path: string;
  country: string | null;
  city: string | null;
  region: string | null;
  name: string;
  email: string;
  phone: string;
  state: string;
  subject: string;
  message: string;
};

async function ensureDataDir(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function trimSubmissionsFile(filePath: string): Promise<void> {
  try {
    const contents = await readFile(filePath, "utf8");
    if (contents.length <= MAX_SUBMISSIONS_FILE_BYTES) return;
    const lines = contents.trimEnd().split("\n");
    const keep = lines.slice(-Math.floor(lines.length * 0.75));
    await writeFile(filePath, `${keep.join("\n")}\n`, "utf8");
  } catch {
    /* file may not exist yet */
  }
}

export async function appendFormSubmission(
  data: NewFormSubmission,
): Promise<FormSubmission> {
  const record: FormSubmission = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    ...data,
  };

  if (useBlobAnalyticsStore()) {
    await appendFormSubmissionBlob(record);
    return record;
  }

  const filePath = analyticsSubmissionsPath();
  await ensureDataDir(filePath);
  await trimSubmissionsFile(filePath);
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

export async function readFormSubmissions(limit = 200): Promise<FormSubmission[]> {
  if (useBlobAnalyticsStore()) {
    return readFormSubmissionsBlob(limit);
  }

  const filePath = analyticsSubmissionsPath();

  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    return [];
  }

  const rows: FormSubmission[] = [];
  for (const line of raw.trimEnd().split("\n")) {
    if (!line) continue;
    try {
      rows.push(JSON.parse(line) as FormSubmission);
    } catch {
      /* skip corrupt lines */
    }
  }

  return rows.slice(-limit).reverse();
}
