import { GetInTouchSection } from "@/components/GetInTouchSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ForCommunitiesSection } from "@/components/ForCommunitiesSection";
import { PartnerCommunitiesSection } from "@/components/PartnerCommunitiesSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { PageShell } from "@/components/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />

      <HowItWorks />

      <FeaturesSection />

      <ForCommunitiesSection />

      <GetInTouchSection tallImage />

      <PartnerCommunitiesSection />
    </PageShell>
  );
}
