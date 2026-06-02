import { GetInTouchSection } from "@/components/GetInTouchSection";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <GetInTouchSection />
    </PageShell>
  );
}
