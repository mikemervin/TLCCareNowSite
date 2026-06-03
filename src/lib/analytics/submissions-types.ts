export type FormSubmissionSource = "contact" | "enterprise";

export type FormSubmission = {
  id: string;
  source: FormSubmissionSource;
  path: string;
  timestamp: string;
  country: string | null;
  name: string;
  email: string;
  phone: string;
  state: string;
  subject: string;
  message: string;
};

export function submissionSourceLabel(source: FormSubmissionSource): string {
  return source === "enterprise" ? "Enterprise demo" : "Contact form";
}
