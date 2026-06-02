import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";
import { GetInTouchSection } from "@/components/GetInTouchSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ForCommunitiesSection } from "@/components/ForCommunitiesSection";
import { PartnerCommunitiesSection } from "@/components/PartnerCommunitiesSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { PageShell } from "@/components/PageShell";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />

      <HowItWorks />

      <FeaturesSection />

      <ForCommunitiesSection />

      <GetInTouchSection />

      <PartnerCommunitiesSection />
    </PageShell>
  );
}
