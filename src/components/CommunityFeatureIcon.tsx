import type { CommunityFeatureIcon } from "@/lib/product";

const iconClass = "h-[1.35rem] w-[1.35rem]";

export function CommunityFeatureIcon({ icon }: { icon: CommunityFeatureIcon }) {
  switch (icon) {
    case "workbasket":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 12h6M9 16h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "schedule":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 8v4l2.5 2M7 3v2M17 3v2M4.5 8h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "insights":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 19V5M4 19h16M8 17v-5M12 17V9M16 17v-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
