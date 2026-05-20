import { CampusCarePageContent } from "@/components/CampusCarePageContent";
import { PageShell } from "@/components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Care",
  description:
    "TeamLife Campus Care is a wellness program for senior living campuses, separate from the TLC CareNow booking app.",
};

export default function CampusCarePage() {
  return (
    <PageShell>
      <CampusCarePageContent />
    </PageShell>
  );
}
