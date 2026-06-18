import { UsaFlagIcon } from "@/components/UsaFlagIcon";

export function HeaderNationwideBadge() {
  return (
    <span
      className="header-pill-nationwide"
      title="Serving communities nationwide"
      aria-label="Serving communities nationwide"
    >
      <span className="header-pill-nationwide__badge" aria-hidden>
        <UsaFlagIcon className="header-pill-nationwide__flag" />
      </span>
    </span>
  );
}
