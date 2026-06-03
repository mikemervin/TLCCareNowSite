import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function SiteJsonLd() {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
}
