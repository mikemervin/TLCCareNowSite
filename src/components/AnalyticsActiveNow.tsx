"use client";

import { useEffect, useState } from "react";
import type { ActiveNowStats } from "@/lib/analytics/types";

const POLL_MS = 30_000;

type AnalyticsActiveNowProps = {
  initial: ActiveNowStats;
};

export function AnalyticsActiveNow({ initial }: AnalyticsActiveNowProps) {
  const [active, setActive] = useState(initial);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      if (!cancelled) setRefreshing(true);
      try {
        const res = await fetch("/api/admin/analytics/active", {
          credentials: "same-origin",
        });
        if (!res.ok) {
          if (!cancelled) setError(true);
          return;
        }
        const data = (await res.json()) as ActiveNowStats;
        if (!cancelled) {
          setActive(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    }

    void refresh();
    const id = window.setInterval(refresh, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <article
      className={`analytics-stat-card analytics-stat-card--today analytics-stat-card--live${
        error ? " analytics-stat-card--live-error" : ""
      }`}
    >
      <div className="analytics-stat-card-top">
        <p className="analytics-stat-label">Online now</p>
        {!error ? (
          <span
            className={`analytics-live-dot${refreshing ? " analytics-live-dot--pulse" : ""}`}
            aria-hidden
          />
        ) : null}
      </div>
      <p className="analytics-stat-value">{active.count}</p>
      <p className="analytics-stat-hint">
        {error
          ? "Live count paused — refresh this page"
          : `Browsers active in the last ${active.windowMinutes} min`}
      </p>
    </article>
  );
}
