import type { HowItWorksIcon } from "@/lib/product";

const iconClass = "h-[1.35rem] w-[1.35rem]";

export function HowStepIcon({ icon }: { icon: HowItWorksIcon }) {
  switch (icon) {
    case "signin":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9h6M9 13h4" strokeLinecap="round" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M7 3v2M17 3v2M4.5 8h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" strokeLinecap="round" />
          <path d="M8 12h2M14 12h2" strokeLinecap="round" />
        </svg>
      );
    case "pay":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 7h16v10H4V7Zm0 0 2-3h12l2 3M8 11h.01M12 11h.01M16 11h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "updates":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 11.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-5 3v-4.5Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 9h8M8 13h5" strokeLinecap="round" />
        </svg>
      );
  }
}
