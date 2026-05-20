import type { FeatureIconType } from "@/lib/product";

const iconClass = "h-5 w-5";

export function FeatureIcon({ icon }: { icon: FeatureIconType }) {
  switch (icon) {
    case "ondemand":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9h6M9 13h4" strokeLinecap="round" />
        </svg>
      );
    case "plans":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "family":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "communication":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M7 3v2M17 3v2M4.5 8h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" strokeLinecap="round" />
          <path d="M8 12h2M14 12h2M8 16h2" strokeLinecap="round" />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 20V9l8-4 8 4v11M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cart":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 6h15l-1.5 9H8L6 6ZM6 6 5 3H3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "history":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 8v4l2.5 2M12 21a9 9 0 1 0-9-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "news":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 4h9a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4Zm0 0v16M10 9h6M10 13h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M16 19v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 8v-1a3 3 0 0 0-2-2.83M16 4.17a3 3 0 0 1 0 5.66" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
