import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { HeaderMobileMenu } from "@/components/HeaderMobileMenu";
import { OutlineCtaLink } from "@/components/OutlineCtaLink";
import { site } from "@/lib/site";

const headerNavLinkClass = [
  "inline-flex items-center justify-center rounded-lg",
  "border border-tlc-primary/20 bg-white",
  "font-bold text-tlc-brand",
  "shadow-[0_1px_4px_rgb(0_0_0/6%)]",
  "transition-all duration-200",
  "hover:border-tlc-primary/45 hover:bg-tlc-green-light/50 hover:shadow-[0_2px_8px_rgb(40_101_43/12%)]",
  "active:scale-[0.98]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-primary",
  "px-2.5 py-2 text-xs min-[480px]:px-3 min-[480px]:py-2 min-[480px]:text-[13px]",
  "sm:px-4 sm:py-2.5 sm:text-sm",
].join(" ");

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full border-b border-tlc-border/80 bg-white/90 shadow-[0_1px_0_rgb(45_45_45/4%),0_4px_24px_rgb(45_45_45/4%)] backdrop-blur-lg backdrop-saturate-150">
        <div className="tlc-header-container h-[68px] sm:h-[76px]">
          <BrandMark compact className="tlc-header-brand" />

          <nav
            className="tlc-header-actions"
            aria-label="Primary actions"
          >
            <Link
              href="/campus-care"
              className={`${headerNavLinkClass} header-campus-link`}
            >
              TeamLife Campus Care
            </Link>
            <Link
              href="/enterprise"
              className={`${headerNavLinkClass} header-enterprise-link`}
            >
              Enterprise Solutions
            </Link>
            <OutlineCtaLink
              href={site.appLoginUrl}
              icon="book"
              external
              size="sm"
              compact
            >
              Book CareNow
            </OutlineCtaLink>
            <OutlineCtaLink
              href={`tel:${site.phoneHeader.replace(/-/g, "")}`}
              icon="phone"
              tabularNums
              size="sm"
              compact
            >
              {site.phoneHeader}
            </OutlineCtaLink>
            <HeaderMobileMenu linkClassName={headerNavLinkClass} />
          </nav>
        </div>
      </div>
    </header>
  );
}
