import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tlc-primary";

const variants = {
  primary:
    "bg-tlc-primary text-white shadow-sm hover:bg-tlc-green-dark hover:shadow-md active:scale-[0.98]",
  secondary:
    "border border-tlc-primary bg-transparent text-tlc-primary hover:bg-tlc-green-light",
  ghost: "text-tlc-text hover:text-tlc-primary",
} as const;

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-sm",
  lg: "px-10 py-3.5 text-sm uppercase tracking-widest",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
};

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={classes(variant, size, className)} {...props} />;
}
