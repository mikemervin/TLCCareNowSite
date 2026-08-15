import { GetInTouchSection } from "@/components/GetInTouchSection";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { pageMetadata } from "@/lib/page-metadata";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact TLC CareNow",
  description:
    "Contact TeamLife for TLC CareNow demos, community partnerships, and questions about care scheduling for independent living.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          contactPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <GetInTouchSection />
    </PageShell>
  );
}
