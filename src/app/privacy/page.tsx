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
      `We use first-party analytics on this marketing website (${site.name} at www.tlccarenow.com) to understand which pages are viewed and how people find the site. Page paths, approximate country (from network headers), browser type, referral source, and timestamps may be stored on our systems. If you type into a contact or demo form, field contents may be logged in our private admin analytics (even if you do not submit), in addition to any information you send through the contact form email.`,
      "You can limit tracking with browser Do Not Track settings; our site skips first-party analytics when that signal is enabled.",
      `We may also use Google Analytics 4 on this site. Google may collect similar usage data and processes it as a service provider. See google.com/policies/privacy/partners and Google’s opt-out tools if you prefer not to be tracked by Google.`,
      `This analytics description applies to this public website, not to the separate CareNow booking application at app.tlccarenow.com, unless that app’s policies say otherwise.`,
    ],
  },
  {
    id: "advertising",
    title: "Advertising on blog pages",
    paragraphs: [
      `We may show Google AdSense ads on ${site.name} blog pages. Google may use cookies or similar technology to serve and measure ads. Ads do not appear on booking, contact, Campus Care, or Enterprise pages.`,
      "You can manage Google ad settings at adssettings.google.com. See google.com/policies/privacy/partners for how Google uses data from partner sites.",
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
      "You can choose what to include in the contact form, update account details in the app when available, and limit analytics or ad tracking using browser tools, Google opt-out tools, or adssettings.google.com. Contact us with questions about your information. We may update this policy; the date at the top of the page will change when we do.",
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
