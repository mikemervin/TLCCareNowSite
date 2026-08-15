"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_HEALTH_SLOT,
  ADSENSE_PUBLISHER_ID,
} from "@/components/BlogAdSense";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type BlogAdSlotProps = {
  className?: string;
};

export function BlogAdSlot({ className }: BlogAdSlotProps) {
  const slotRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || slot.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Script may not be ready yet, or the slot was already filled.
    }
  }, []);

  return (
    <aside
      className={`blog-ad${className ? ` ${className}` : ""}`}
      aria-label="Advertisement"
    >
      <p className="blog-ad-label">Advertisement</p>
      <ins
        ref={slotRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: 728, height: 90 }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={ADSENSE_HEALTH_SLOT}
      />
    </aside>
  );
}