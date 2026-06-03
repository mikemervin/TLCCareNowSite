import { CampusCarePageContent } from "@/components/CampusCarePageContent";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "TeamLife Campus Care — Senior Living Wellness",
  description:
    "TeamLife Campus Care wellness programs for senior living campuses—separate from TLC CareNow booking for residents and care scheduling.",
  path: "/campus-care",
});

export default function CampusCarePage() {
  return (
    <PageShell>
      <CampusCarePageContent />
    </PageShell>
  );
}
