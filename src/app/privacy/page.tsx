import { LegalDocument } from "@/components/LegalDocument";
import { PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles your information.`,
  path: "/privacy",
});

const sections = [
  {
    id: "collect",
    title: "What we collect",
    paragraphs: [
      `When you use this website or the ${site.name} app, we may collect information you provide—such as contact form details (name, email, phone, state, and message), account and booking information in the app, and basic technical data needed to run our services.`,
    ],
  },
  {
    id: "use",
    title: "How we use it",
    paragraphs: [
      "We use this information to respond to you, operate and improve CareNow, process bookings and payments, send service-related messages, and keep our platform secure. We do not sell your personal information.",
    ],
  },
  {
    id: "share",
    title: "Sharing and security",
    paragraphs: [
      "We may share data with trusted vendors who help us host, process payments, or communicate with you—they must protect your information and use it only for our work. We may also share information when the law requires it.",
      "CareNow is built for senior living communities and uses safeguards appropriate for sensitive care-related data. This website does not provide medical advice.",
    ],
  },
  {
    id: "choices",
    title: "Your choices",
    paragraphs: [
      "You can choose what to include in the contact form, update account details in the app when available, and contact us with questions about your information. We may update this policy; the date at the top of the page will change when we do.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      `Privacy questions? Email ${site.email}, call ${site.phoneHeader}, or use our contact form.`,
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="legal-page">
        <div className="tlc-container legal-page-inner">
          <LegalDocument
            title="Privacy Policy"
            intro={`A short summary of how TeamLife Health Group handles information for ${site.name} on this site and in the app.`}
            sections={sections}
            sibling={{ href: "/terms", label: "Terms of Use" }}
          />
        </div>
      </section>
    </PageShell>
  );
}
