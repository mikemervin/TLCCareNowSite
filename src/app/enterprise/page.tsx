import { EnterprisePageContent } from "@/components/EnterprisePageContent";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Enterprise Solutions",
  description:
    "Book on behalf of residents in seconds, role-based dashboards, and one platform for supervisors, admins, and owners.",
  path: "/enterprise",
});

export default function EnterprisePage() {
  return (
    <PageShell>
      <EnterprisePageContent />
    </PageShell>
  );
}
