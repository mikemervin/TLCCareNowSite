import { LegalDocument } from "@/components/LegalDocument";
import { PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${site.name}.`,
};

const sections = [
  {
    id: "using",
    title: "Using CareNow",
    paragraphs: [
      `By using this website or ${site.name} at app.tlccarenow.com, you agree to these terms. The service is provided by TeamLife Health Group for residents, families, and authorized staff in participating communities.`,
      "Please provide accurate information, keep your login details private, use the app lawfully, and pay for booked services as shown at checkout.",
    ],
  },
  {
    id: "important",
    title: "Good to know",
    paragraphs: [
      "Site content is for general information only—not medical advice. Services, pricing, and availability depend on your community. We may update the site or app at any time.",
    ],
  },
  {
    id: "rights",
    title: "Content and liability",
    paragraphs: [
      "TLC CareNow branding and content belong to TeamLife Health Group. Please don’t copy or misuse our materials without permission.",
      "We provide the website and app “as is” as allowed by law. TeamLife is not responsible for third-party sites we link to (such as social media).",
    ],
  },
  {
    id: "changes",
    title: "Changes and contact",
    paragraphs: [
      "We may update these terms; continued use means you accept the current version (see the date above).",
      `Questions? Email ${site.email}, call ${site.phoneHeader}, or visit our contact page.`,
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <PageShell>
      <section className="legal-page">
        <div className="tlc-container legal-page-inner">
          <LegalDocument
            title="Terms of Use"
            intro={`Simple terms for using the ${site.name} website and app.`}
            sections={sections}
            sibling={{ href: "/privacy", label: "Privacy Policy" }}
          />
        </div>
      </section>
    </PageShell>
  );
}
