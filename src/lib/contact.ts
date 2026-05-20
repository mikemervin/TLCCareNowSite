import { site } from "@/lib/site";

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  state: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. */
  company: string;
};

export function parseContactForm(
  formData: FormData,
): { ok: true; data: ContactFormPayload } | { ok: false; error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (company) {
    return { ok: true, data: { name, email, phone, state, subject, message, company } };
  }

  if (!name || name.length > 120) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (phone.length > 40) {
    return { ok: false, error: "Phone number is too long." };
  }

  if (state.length > 80) {
    return { ok: false, error: "State is too long." };
  }

  if (subject.length > 200) {
    return { ok: false, error: "Subject is too long." };
  }

  if (message.length > 5000) {
    return { ok: false, error: "Message is too long." };
  }

  return {
    ok: true,
    data: { name, email, phone, state, subject, message, company },
  };
}

export function contactRecipientEmail(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || site.email;
}

export function contactFromAddress(): string {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (configured) return configured;

  // Resend test sender — works without domain verification (see Resend docs).
  return "TLC CareNow <onboarding@resend.dev>";
}

/** Turn Resend API errors into text we can show in the contact form. */
export function messageFromResendError(error: unknown): string {
  const raw =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
      ? (error as { message: string }).message
      : "";

  const lower = raw.toLowerCase();

  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "Email service is misconfigured (invalid API key). Please email us directly.";
  }

  if (
    lower.includes("verify") &&
    (lower.includes("domain") || lower.includes("from"))
  ) {
    return "Sending domain is not verified in Resend yet. Verify teamlifecares.com in Resend, or set CONTACT_FROM_EMAIL to onboarding@resend.dev for testing.";
  }

  if (lower.includes("only send") || lower.includes("testing")) {
    return "Resend test mode only allows sending to your Resend account email. Verify your domain in Resend, or test with that address as CONTACT_TO_EMAIL.";
  }

  if (lower.includes("from") && lower.includes("invalid")) {
    return "The sender address (CONTACT_FROM_EMAIL) is invalid. Use Name <email@verified-domain.com> or onboarding@resend.dev for testing.";
  }

  if (raw) {
    return `Email could not be sent: ${raw}`;
  }

  return "We could not send your message. Please try again or email us directly.";
}

export function buildContactEmailHtml(data: ContactFormPayload): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["State", data.state || "—"],
    ["Subject", data.subject || "—"],
    ["Message", data.message || "—"],
  ] as const;

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;font-weight:600;color:#1c431d;vertical-align:top">${label}</td><td style="padding:8px 0;color:#4a474f">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1d1b20"><p style="margin:0 0 16px">New message from the TLC CareNow website contact form:</p><table>${body}</table></body></html>`;
}

export function buildContactEmailText(data: ContactFormPayload): string {
  return [
    "New message from the TLC CareNow website contact form",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `State: ${data.state || "—"}`,
    `Subject: ${data.subject || "—"}`,
    "",
    "Message:",
    data.message || "—",
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
