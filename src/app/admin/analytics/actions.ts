"use server";

import { redirect } from "next/navigation";
import {
  clearAnalyticsSession,
  isValidAdminKey,
  setAnalyticsSession,
} from "@/lib/analytics/auth";

export async function unlockAnalytics(
  _prev: { error?: boolean },
  formData: FormData,
): Promise<{ error?: boolean }> {
  const key = String(formData.get("key") ?? "").trim();
  if (!isValidAdminKey(key)) {
    return { error: true };
  }

  await setAnalyticsSession();
  redirect("/admin/analytics");
}

export async function logoutAnalytics() {
  await clearAnalyticsSession();
  redirect("/admin/analytics");
}
