import { site } from "@/lib/site";

type TeamLifeWebsiteLinkProps = {
  className?: string;
  showExternalIcon?: boolean;
};

export function TeamLifeWebsiteLink({
  className = "",
  showExternalIcon = true,
}: TeamLifeWebsiteLinkProps) {
  return (
    <a
      href={site.teamLifeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex w-fit items-center gap-1 font-medium text-[#3b6ea8] underline decoration-[#3b6ea8]/40 underline-offset-[3px] transition-colors hover:text-[#2a5080] hover:decoration-[#2a5080]/60 ${className}`}
    >
      {site.teamLifeWebsite}
      {showExternalIcon ? (
        <svg
          viewBox="0 0 16 16"
          className="h-3 w-3 shrink-0 opacity-70"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M6 3h7v7M13 3 6 10M9 3H3v10h10V9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}
