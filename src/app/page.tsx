import { pageMetadata } from "@/lib/page-metadata";
import { GetInTouchSection } from "@/components/GetInTouchSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ForCommunitiesSection } from "@/components/ForCommunitiesSection";
import { PartnerCommunitiesSection } from "@/components/PartnerCommunitiesSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { homeFaqs } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Care for Independent Living Communities",
  description:
    "TLC CareNow helps residents of independent living communities nationwide book same-day and short-term care without traditional agency minimums—plus operator tools for your team.",
  path: "/",
});

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd data={faqPageJsonLd(homeFaqs)} />
      <HeroSection />

      <HowItWorks />

      <FeaturesSection />

      <ForCommunitiesSection />

      <FaqSection items={homeFaqs} />

      <GetInTouchSection />

      <PartnerCommunitiesSection />
    </PageShell>
  );
}
