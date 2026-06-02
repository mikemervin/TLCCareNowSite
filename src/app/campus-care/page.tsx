import { CampusCarePageContent } from "@/components/CampusCarePageContent";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Campus Care",
  description:
    "TeamLife Campus Care is a wellness program for senior living campuses, separate from the TLC CareNow booking app.",
  path: "/campus-care",
});

export default function CampusCarePage() {
  return (
    <PageShell>
      <CampusCarePageContent />
    </PageShell>
  );
}
