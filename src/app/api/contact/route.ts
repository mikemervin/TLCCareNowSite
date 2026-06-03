import { countryFromHeaders } from "@/lib/analytics/parse";
import { appendFormSubmission } from "@/lib/analytics/submissions-store";
import type { FormSubmissionSource } from "@/lib/analytics/submissions-types";
import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  contactFromAddress,
  contactRecipientEmail,
  messageFromResendError,
  parseContactForm,
} from "@/lib/contact";

function submissionMeta(formData: FormData): {
  source: FormSubmissionSource;
  path: string;
} {
  const rawSource = String(formData.get("form_source") ?? "contact").trim();
  const source: FormSubmissionSource =
    rawSource === "enterprise" ? "enterprise" : "contact";
  const pagePath = String(formData.get("form_path") ?? "/contact").trim();
  const path = pagePath.startsWith("/") ? pagePath.slice(0, 512) : "/contact";
  return { source, path };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json(
      { error: "Contact form is not configured yet. Please email us directly." },
      { status: 503 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const parsed = parseContactForm(formData);

  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  if (parsed.data.company) {
    return Response.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const to = contactRecipientEmail();
  const from = contactFromAddress();
  const subject =
    parsed.data.subject.trim() ||
    `TLC CareNow website — message from ${parsed.data.name}`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.data.email,
    subject,
    html: buildContactEmailHtml(parsed.data),
    text: buildContactEmailText(parsed.data),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: messageFromResendError(error) },
      { status: 502 },
    );
  }

  const { source, path } = submissionMeta(formData);
  try {
    await appendFormSubmission({
      source,
      path,
      country: countryFromHeaders(request.headers),
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      state: parsed.data.state,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
  } catch (storeError) {
    console.error("Form submission store error:", storeError);
  }

  return Response.json({ ok: true });
}
