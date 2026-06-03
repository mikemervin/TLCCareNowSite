"use client";

import { useActionState, useState } from "react";
import { unlockAnalytics } from "@/app/admin/analytics/actions";
import { Button } from "@/components/ui/Button";

export function AnalyticsUnlockForm() {
  const [state, formAction, pending] = useActionState(unlockAnalytics, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="analytics-unlock-wrap">
      <div className="analytics-unlock-card">
        <p className="analytics-unlock-eyebrow">Private</p>
        <h1 className="analytics-unlock-title">Site analytics</h1>
        <span className="tlc-accent-line analytics-unlock-accent" aria-hidden />
        <p className="analytics-unlock-text">
          Enter your admin password to view site traffic and forms.
        </p>

        {state.error ? (
          <p className="analytics-unlock-error" role="alert">
            Incorrect password. Try again.
          </p>
        ) : null}

        <form className="analytics-unlock-form" action={formAction}>
          <label htmlFor="analytics-key" className="analytics-unlock-label">
            Password
          </label>
          <div className="analytics-unlock-password">
            <input
              id="analytics-key"
              type={showPassword ? "text" : "password"}
              name="key"
              className="analytics-unlock-input"
              placeholder="Admin password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="analytics-unlock-show-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <Button
            type="submit"
            size="md"
            className="analytics-unlock-submit"
            disabled={pending}
          >
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
