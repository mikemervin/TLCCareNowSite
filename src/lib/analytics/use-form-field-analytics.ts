"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackFormFieldInput } from "@/lib/analytics/client";

const DEBOUNCE_MS = 600;

/** Debounced per-field typing capture for the admin analytics dashboard. */
export function useFormFieldAnalytics(formId: string, path?: string) {
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const timersMap = timers.current;
    return () => {
      for (const timer of timersMap.values()) clearTimeout(timer);
      timersMap.clear();
    };
  }, []);

  return useCallback(
    (field: string, value: string) => {
      if (field === "company") return;

      const existing = timers.current.get(field);
      if (existing) clearTimeout(existing);

      timers.current.set(
        field,
        setTimeout(() => {
          timers.current.delete(field);
          trackFormFieldInput(formId, field, value, { path });
        }, DEBOUNCE_MS),
      );
    },
    [formId, path],
  );
}
