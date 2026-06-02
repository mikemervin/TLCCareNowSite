import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { AnalyticsUnlockForm } from "@/components/AnalyticsUnlockForm";
import { PageShell } from "@/components/PageShell";
import {
  analyticsAdminSecret,
  useBlobAnalyticsStore,
} from "@/lib/analytics/config";
import {
  buildAnalyticsSummary,
  readAnalyticsEvents,
} from "@/lib/analytics/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ key?: string }>;
};

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const secret = analyticsAdminSecret();
  const { key } = await searchParams;

  return (
    <PageShell>
      <section className="analytics-admin-page">
        <div className="tlc-container analytics-admin-inner">
          {!secret ? (
            <div className="analytics-unlock">
              <h1 className="analytics-unlock-title">Analytics not configured</h1>
              <p className="analytics-unlock-text">
                Set <code className="analytics-unlock-code">ANALYTICS_ADMIN_SECRET</code>{" "}
                (16+ characters) in your environment, then redeploy.
              </p>
            </div>
          ) : key !== secret ? (
            <AnalyticsUnlockForm error={Boolean(key)} />
          ) : (
            <AnalyticsDashboard
              summary={buildAnalyticsSummary(
                await readAnalyticsEvents(),
                useBlobAnalyticsStore() ? "blob" : "file",
              )}
            />
          )}
        </div>
      </section>
    </PageShell>
  );
}
