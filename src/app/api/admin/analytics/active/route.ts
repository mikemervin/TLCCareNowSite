import { isAnalyticsSessionValid } from "@/lib/analytics/auth";
import { buildActiveNowStats } from "@/lib/analytics/active-now";
import { readAnalyticsEvents } from "@/lib/analytics/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAnalyticsSessionValid())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const events = await readAnalyticsEvents();
  return Response.json(buildActiveNowStats(events));
}
