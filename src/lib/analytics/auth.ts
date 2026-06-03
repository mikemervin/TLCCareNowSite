import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { analyticsAdminSecret } from "@/lib/analytics/config";

const COOKIE_NAME = "tlc_analytics_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sessionToken(secret: string): string {
  return createHash("sha256").update(`tlc-analytics:${secret}`).digest("hex");
}

export function isValidAdminKey(key: string | undefined): boolean {
  const secret = analyticsAdminSecret();
  if (!secret || !key) return false;
  if (key.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(key), Buffer.from(secret));
}

export async function isAnalyticsSessionValid(): Promise<boolean> {
  const secret = analyticsAdminSecret();
  if (!secret) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return false;

  const expected = sessionToken(secret);
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function setAnalyticsSession(): Promise<void> {
  const secret = analyticsAdminSecret();
  if (!secret) return;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin/analytics",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAnalyticsSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
