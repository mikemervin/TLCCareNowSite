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

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
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
      }
    }

    const id = window.setInterval(refresh, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <article className="analytics-stat-card analytics-stat-card--today analytics-stat-card--live">
      <p className="analytics-stat-label">Online now</p>
      <p className="analytics-stat-value">{active.count}</p>
      <p className="analytics-stat-hint">
        {error
          ? "Could not refresh — reload the page"
          : `Active in the last ${active.windowMinutes} min · updates every 30s`}
      </p>
    </article>
  );
}
