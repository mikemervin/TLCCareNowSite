import { EnterprisePageContent } from "@/components/EnterprisePageContent";
import { PageShell } from "@/components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Solutions",
  description:
    "Book on behalf of residents in seconds, role-based dashboards, and one platform for supervisors, admins, and owners.",
};

export default function EnterprisePage() {
  return (
    <PageShell>
      <EnterprisePageContent />
    </PageShell>
  );
}
