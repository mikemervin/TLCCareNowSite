import { EnterprisePageContent } from "@/components/EnterprisePageContent";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Enterprise Solutions",
  description:
    "Operator software designed for supervisors, admins, and owners—simple dashboards to book care, run the day, and handle payroll without complicated tools.",
  path: "/enterprise",
});

export default function EnterprisePage() {
  return (
    <PageShell>
      <EnterprisePageContent />
    </PageShell>
  );
}
