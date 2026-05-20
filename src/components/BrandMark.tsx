import Image from "next/image";
import Link from "next/link";
import { TeamLifeWebsiteLink } from "@/components/TeamLifeWebsiteLink";
import {
  APP_BRAND_DISPLAY_NAME,
  APP_BRAND_POWERED_BY,
  APP_BRAND_HEADER_TAGLINE_CLASS,
  APP_BRAND_HEADER_TITLE_CLASS,
} from "@/lib/app-brand";

type BrandMarkProps = {
  showTeamLifeLink?: boolean;
  compact?: boolean;
  className?: string;
};

export function BrandMark({
  showTeamLifeLink = false,
  compact = false,
  className = "",
}: BrandMarkProps) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`.trim()}
    >
      <Link
        href="/"
        className="group shrink-0 rounded-lg p-0.5 transition-colors hover:bg-tlc-green-light/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-green"
      >
        <Image
          src="/logo.svg"
          alt=""
          width={44}
          height={44}
          priority
          className={
            compact
              ? "h-9 w-9 sm:h-10 sm:w-10"
              : "h-10 w-10 sm:h-11 sm:w-11"
          }
        />
      </Link>

      <div className="flex min-w-0 flex-col items-start leading-none">
        <Link
          href="/"
          className={`${APP_BRAND_HEADER_TITLE_CLASS} ${
            compact ? "truncate text-lg sm:max-w-none sm:text-xl" : ""
          } transition-colors hover:text-[#2d6b2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-green`}
        >
          {APP_BRAND_DISPLAY_NAME}
        </Link>
        <p
          className={`${APP_BRAND_HEADER_TAGLINE_CLASS} mt-1 ${
            compact ? "hidden min-[400px]:block" : ""
          }`}
        >
          {APP_BRAND_POWERED_BY}
        </p>
        {showTeamLifeLink ? (
          <TeamLifeWebsiteLink className="mt-1.5 text-[11px] sm:text-[12px]" />
        ) : null}
      </div>
    </div>
  );
}
