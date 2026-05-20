import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  contactFromAddress,
  contactRecipientEmail,
  messageFromResendError,
  parseContactForm,
} from "@/lib/contact";

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

  return Response.json({ ok: true });
}
