"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/client";
import { useFormFieldAnalytics } from "@/lib/analytics/use-form-field-analytics";
import { useFormStartedAnalytics } from "@/lib/analytics/use-form-analytics";
import { site } from "@/lib/site";

const STORAGE_KEY = "tlc-enterprise-lead-seen";
const TRIGGER_SECTION_ID = "enterprise-see-platform";
const PERSIST_DISMISSAL = process.env.NODE_ENV === "production";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text" as const,
    autoComplete: "name",
    placeholder: "Jane Smith",
  },
  {
    name: "email",
    label: "Work email",
    type: "email" as const,
    autoComplete: "email",
    placeholder: "jane@community.org",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel" as const,
    autoComplete: "tel",
    placeholder: "(555) 123-4567",
  },
  {
    name: "state",
    label: "Community or location",
    type: "text" as const,
    autoComplete: "address-level1",
    placeholder: "City, ST",
  },
] as const;

function markSeen(): void {
  if (!PERSIST_DISMISSAL) return;
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private browsing / storage blocked */
  }
}

function hasSeen(): boolean {
  if (!PERSIST_DISMISSAL) return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function EnterpriseLeadCapture() {
  const titleId = useId();
  const descId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const triggered = useRef(false);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupShownTracked = useRef(false);
  const onFormStarted = useFormStartedAnalytics(
    "enterprise_lead_started",
    "/enterprise",
  );
  const trackField = useFormFieldAnalytics("enterprise", "/enterprise");

  const close = useCallback(() => {
    setOpen(false);
    markSeen();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hasSeen()) return;

    const section = document.getElementById(TRIGGER_SECTION_ID);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || triggered.current) return;
        if (entry.intersectionRatio < 0.2) return;

        triggered.current = true;
        delayTimer.current = setTimeout(() => {
          if (!hasSeen()) setOpen(true);
        }, 600);
      },
      { threshold: [0, 0.2, 0.35], rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (delayTimer.current) clearTimeout(delayTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open || popupShownTracked.current) return;
    popupShownTracked.current = true;
    trackEvent("enterprise_lead_shown", { path: "/enterprise" });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set(
      "subject",
      "Enterprise Solutions — platform demo request",
    );
    formData.set(
      "message",
      "Submitted from the Enterprise page popup after viewing See the platform.",
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          result.error ||
            `Something went wrong. Please email us at ${site.email}.`,
        );
        return;
      }

      setStatus("success");
      markSeen();
      trackEvent("enterprise_lead_submitted", { path: "/enterprise" });
    } catch {
      setStatus("error");
      setErrorMessage(
        `Something went wrong. Please email us at ${site.email}.`,
      );
    }
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div className="enterprise-lead-backdrop" onClick={close}>
      <div
        className="enterprise-lead-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="enterprise-lead-close"
          onClick={close}
          aria-label="Close"
        >
          <span aria-hidden>×</span>
        </button>

        <div className="enterprise-lead-accent-bar" aria-hidden />

        {status === "success" ? (
          <div className="enterprise-lead-body enterprise-lead-success" role="status">
            <span className="enterprise-lead-success-icon" aria-hidden>
              ✓
            </span>
            <h2 id={titleId} className="enterprise-lead-title">
              You&apos;re on the list
            </h2>
            <p id={descId} className="enterprise-lead-text">
              Thanks—we&apos;ll reach out shortly to schedule your walkthrough.
            </p>
            <Button
              type="button"
              size="md"
              className="enterprise-lead-submit"
              onClick={close}
            >
              Back to the tour
            </Button>
          </div>
        ) : (
          <div className="enterprise-lead-body">
            <header className="enterprise-lead-header">
              <p className="enterprise-lead-eyebrow">Complimentary demo</p>
              <h2 id={titleId} className="enterprise-lead-title">
                See CareNow in action
              </h2>
              <span className="tlc-accent-line enterprise-lead-accent" aria-hidden />
              <p id={descId} className="enterprise-lead-text">
                We&apos;ll follow up to schedule a walkthrough for your community.
              </p>
            </header>

            <form
              className="enterprise-lead-form"
              onSubmit={handleSubmit}
              onFocusCapture={onFormStarted}
              noValidate
            >
              <div className="enterprise-lead-fields">
                {fields.map((field) => {
                  const inputId = `enterprise-lead-${field.name}`;
                  return (
                    <label
                      key={field.name}
                      htmlFor={inputId}
                      className="enterprise-lead-field"
                    >
                      <span className="enterprise-lead-label">{field.label}</span>
                      <input
                        id={inputId}
                        type={field.type}
                        name={field.name}
                        required
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        className="enterprise-lead-input"
                        disabled={status === "submitting"}
                        onChange={(event) =>
                          trackField(field.name, event.currentTarget.value)
                        }
                      />
                    </label>
                  );
                })}
              </div>

              <input type="hidden" name="form_source" value="enterprise" />
              <input type="hidden" name="form_path" value="/enterprise" />

              <div className="contact-form-honeypot" aria-hidden="true">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" ? (
                <p className="enterprise-lead-error" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="enterprise-lead-actions">
                <Button
                  type="submit"
                  size="md"
                  className="enterprise-lead-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Request my free demo"}
                </Button>
                <button
                  type="button"
                  className="enterprise-lead-dismiss"
                  onClick={close}
                  disabled={status === "submitting"}
                >
                  Maybe later
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
