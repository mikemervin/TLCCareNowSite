import { EnterprisePageContent } from "@/components/EnterprisePageContent";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Enterprise Solutions for Senior Living Operators",
  description:
    "TLC CareNow enterprise software for independent living and senior living—schedule care by the visit, role-based dashboards, and payroll visibility without complicated tools.",
  path: "/enterprise",
});

export default function EnterprisePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          softwareApplicationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Enterprise", path: "/enterprise" },
          ]),
        ]}
      />
      <EnterprisePageContent />
    </PageShell>
  );
}
