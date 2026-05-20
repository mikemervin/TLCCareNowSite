import Link from "next/link";
import { site } from "@/lib/site";

type AppLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
  size?: "md" | "lg";
  external?: boolean;
  /** Show ↗ on primary/secondary buttons (default true). */
  showExternalIcon?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-primary";

const variants = {
  primary: `${base} rounded-md bg-tlc-primary text-white shadow-md hover:bg-tlc-green-dark hover:shadow-lg active:scale-[0.98]`,
  secondary: `${base} rounded-md border border-tlc-primary bg-transparent text-tlc-primary hover:bg-tlc-green-light`,
  text: `${base} text-tlc-primary underline-offset-4 hover:underline`,
};

const sizes = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-[15px] font-bold tracking-wide",
};

export function AppLink({
  href = site.appLoginUrl,
  children,
  className = "",
  variant = "primary",
  size = "md",
  external = true,
  showExternalIcon = true,
}: AppLinkProps) {
  const classes = `${variants[variant]} ${variant !== "text" ? sizes[size] : ""} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {variant !== "text" && showExternalIcon ? (
          <span className="sr-only"> (opens in new tab)</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
