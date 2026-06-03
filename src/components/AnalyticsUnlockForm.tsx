"use client";

import { useActionState } from "react";
import { unlockAnalytics } from "@/app/admin/analytics/actions";
import { Button } from "@/components/ui/Button";

export function AnalyticsUnlockForm() {
  const [state, formAction, pending] = useActionState(unlockAnalytics, {});

  return (
    <div className="analytics-unlock">
      <p className="analytics-unlock-eyebrow">Private</p>
      <h1 className="analytics-unlock-title">Analytics dashboard</h1>
      <span className="tlc-accent-line analytics-unlock-accent" aria-hidden />
      <p className="analytics-unlock-text">
        Sign in once with your admin secret. After that, use the short link{" "}
        <strong>/admin/analytics</strong> on this device.
      </p>
      {state.error ? (
        <p className="analytics-unlock-error" role="alert">
          That secret didn&apos;t work. Use the value from{" "}
          <code className="analytics-unlock-code">ANALYTICS_ADMIN_SECRET</code>{" "}
          in Vercel (not the variable name).
        </p>
      ) : null}
      <form className="analytics-unlock-form" action={formAction}>
        <label htmlFor="analytics-key" className="analytics-unlock-label">
          Admin secret
        </label>
        <input
          id="analytics-key"
          type="password"
          name="key"
          className="analytics-unlock-input"
          placeholder="Your secret"
          autoComplete="current-password"
          required
        />
        <Button
          type="submit"
          size="md"
          className="analytics-unlock-submit"
          disabled={pending}
        >
          {pending ? "Signing in…" : "View dashboard"}
        </Button>
      </form>
    </div>
  );
}
