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
    id: "analytics",
    title: "Website analytics (this site only)",
    paragraphs: [
      `We use Google Analytics 4 on this marketing website (${site.name} at tlccarenow.com) to understand how people find and use the site. This helps us improve pages such as our home, Enterprise, and contact content.`,
      "Google Analytics may collect information such as pages viewed, approximate location (city/region/country), device and browser type, referral source (for example, a search engine or another website), and general interaction data. It does not tell us your name or email unless you separately submit the contact form.",
      "Google processes this data on our behalf as a service provider. You can learn how Google uses data at google.com/policies/privacy/partners. You may install Google’s browser opt-out add-on or use browser settings that limit cookies if you prefer not to be tracked on sites that use Google Analytics.",
      `This analytics description applies to this public website, not to the separate CareNow booking application at app.tlccarenow.com, unless that app’s policies say otherwise.`,
    ],
  },
  {
    id: "use",
    title: "How we use it",
    paragraphs: [
      "We use this information to respond to you, operate and improve CareNow, process bookings and payments, send service-related messages, and keep our platform secure. We do not sell your personal information.",
      "Analytics data is used only to measure traffic, see which pages are helpful, and improve the marketing site.",
    ],
  },
  {
    id: "share",
    title: "Sharing and security",
    paragraphs: [
      "We may share data with trusted vendors who help us host, process payments, communicate with you, or provide website analytics—they must protect your information and use it only for our work. We may also share information when the law requires it.",
      "CareNow is built for senior living communities and uses safeguards appropriate for sensitive care-related data. This website does not provide medical advice.",
    ],
  },
  {
    id: "choices",
    title: "Your choices",
    paragraphs: [
      "You can choose what to include in the contact form, update account details in the app when available, and limit analytics tracking using browser or Google opt-out tools described above. Contact us with questions about your information. We may update this policy; the date at the top of the page will change when we do.",
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
