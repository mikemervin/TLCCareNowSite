import { CampusCarePageContent } from "@/components/CampusCarePageContent";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TeamLife Campus Care — Senior Living Wellness",
  description:
    "TeamLife Campus Care wellness programs for senior living campuses—separate from TLC CareNow booking for residents and care scheduling.",
  path: "/campus-care",
});

export default function CampusCarePage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Campus Care", path: "/campus-care" },
        ])}
      />
      <CampusCarePageContent />
    </PageShell>
  );
}
