import { EnterprisePageContent } from "@/components/EnterprisePageContent";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Enterprise Solutions for Senior Living Operators",
  description:
    "TLC CareNow enterprise software for independent living and senior living—schedule care by the visit, role-based dashboards, and payroll visibility without complicated tools.",
  path: "/enterprise",
});

export default function EnterprisePage() {
  return (
    <PageShell>
      <EnterprisePageContent />
    </PageShell>
  );
}
