import Link from "next/link";

const outlineCtaBase = [
  "inline-flex items-center justify-center gap-2.5 rounded-lg",
  "border border-tlc-primary/20 bg-white",
  "font-bold text-tlc-brand",
  "shadow-[0_1px_4px_rgb(0_0_0/6%)]",
  "transition-all duration-200",
  "hover:border-tlc-primary/45 hover:bg-tlc-green-light/50 hover:shadow-[0_2px_8px_rgb(40_101_43/12%)]",
  "active:scale-[0.98]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-primary",
].join(" ");

const sizes = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-2.5 text-sm tracking-wide",
  lg: "px-6 py-3.5 text-[15px] tracking-wide sm:px-8",
};

function CtaIconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tlc-green-light text-tlc-primary">
      {children}
    </span>
  );
}

export function BookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M6 2.5v1.5M14 2.5v1.5M4.5 5h11M5 4h10a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 15 16H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 9h2M11 9h2M7 12h2" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M5.5 3.5h2l1.2 2.8a1 1 0 0 1-.24 1.02l-1.1 1.1a12 12 0 0 0 5.42 5.42l1.1-1.1a1 1 0 0 1 1.02-.24l2.8 1.2v2a1.5 1.5 0 0 1-1.5 1.5C8.2 17.5 2.5 11.8 2.5 4.5A1.5 1.5 0 0 1 4 3h1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type OutlineCtaLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: "book" | "phone";
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  tabularNums?: boolean;
};

export function OutlineCtaLink({
  href,
  children,
  icon,
  size = "md",
  className = "",
  external = false,
  onClick,
  tabularNums = false,
}: OutlineCtaLinkProps) {
  const classes = `${outlineCtaBase} ${sizes[size]} ${tabularNums ? "tabular-nums" : ""} ${className}`;

  const content = (
    <>
      <CtaIconBadge>
        {icon === "book" ? <BookIcon /> : <PhoneIcon />}
      </CtaIconBadge>
      <span className="whitespace-nowrap">{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
