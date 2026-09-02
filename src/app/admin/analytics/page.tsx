import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { AnalyticsUnlockForm } from "@/components/AnalyticsUnlockForm";
import { PageShell } from "@/components/PageShell";
import {
  isAnalyticsSessionValid,
  isValidAdminKey,
  setAnalyticsSession,
} from "@/lib/analytics/auth";
import { analyticsAdminSecret, analyticsStorageBackend } from "@/lib/analytics/config";
import { readFormSubmissions } from "@/lib/analytics/submissions-store";
import {
  buildAnalyticsSummary,
  readAnalyticsEvents,
} from "@/lib/analytics/store";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ key?: string }>;
};

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const secret = analyticsAdminSecret();
  const { key } = await searchParams;

  if (!secret) {
    return (
      <PageShell variant="analytics-panel">
        <section className="analytics-admin-page">
          <div className="tlc-container analytics-admin-inner">
            <div className="analytics-console">
            <div className="analytics-unlock-wrap">
              <div className="analytics-unlock-card">
                <h1 className="analytics-unlock-title">Analytics not set up</h1>
                <p className="analytics-unlock-text">
                  Add{" "}
                  <code className="analytics-unlock-code">ANALYTICS_ADMIN_SECRET</code>{" "}
                  to your environment, then restart or redeploy.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (key && isValidAdminKey(key)) {
    await setAnalyticsSession();
    redirect("/admin/analytics");
  }

  const authed = await isAnalyticsSessionValid();
  const submissions = authed ? await readFormSubmissions() : [];

  return (
    <PageShell variant="analytics-panel">
      <section className="analytics-admin-page">
        <div className="tlc-container analytics-admin-inner">
          <div className="analytics-console">
            {!authed ? (
              <AnalyticsUnlockForm />
            ) : (
              <AnalyticsDashboard
                summary={buildAnalyticsSummary(
                  await readAnalyticsEvents(),
                  analyticsStorageBackend(),
                  submissions,
                )}
                submissions={submissions}
                showProductionHints={process.env.VERCEL === "1"}
              />
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
