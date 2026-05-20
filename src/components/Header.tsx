import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
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
  "px-3 py-2 text-[13px] sm:px-4 sm:py-2.5 sm:text-sm",
].join(" ");

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full border-b border-tlc-border/80 bg-white/90 shadow-[0_1px_0_rgb(45_45_45/4%),0_4px_24px_rgb(45_45_45/4%)] backdrop-blur-lg backdrop-saturate-150">
        <div className="tlc-header-container h-[68px] sm:h-[76px]">
          <BrandMark compact />

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Link href="/campus-care" className={headerNavLinkClass}>
              <span className="whitespace-nowrap sm:hidden">Campus Care</span>
              <span className="hidden whitespace-nowrap sm:inline">
                TeamLife Campus Care
              </span>
            </Link>
            <OutlineCtaLink
              href={site.appLoginUrl}
              icon="book"
              external
              size="sm"
              className="max-sm:px-3 max-sm:py-2 max-sm:text-[13px]"
            >
              Book CareNow
            </OutlineCtaLink>
            <OutlineCtaLink
              href={`tel:${site.phoneHeader.replace(/-/g, "")}`}
              icon="phone"
              tabularNums
              size="sm"
              className="max-sm:px-3 max-sm:py-2 max-sm:text-[13px]"
            >
              {site.phoneHeader}
            </OutlineCtaLink>
          </div>
        </div>
      </div>
    </header>
  );
}
