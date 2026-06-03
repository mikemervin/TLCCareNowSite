import { GetInTouchSection } from "@/components/GetInTouchSection";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Contact TLC CareNow",
  description:
    "Contact TeamLife for TLC CareNow demos, community partnerships, and questions about care scheduling for independent living.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <GetInTouchSection />
    </PageShell>
  );
}
