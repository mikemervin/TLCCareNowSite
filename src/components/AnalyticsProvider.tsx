"use client";

import { Suspense } from "react";
import { FirstPartyAnalytics } from "@/components/FirstPartyAnalytics";

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <FirstPartyAnalytics />
    </Suspense>
  );
}
