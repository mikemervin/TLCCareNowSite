type SectionHeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  subtitle?: string;
  className?: string;
};

export function SectionHeading({
  children,
  as: Tag = "h2",
  align = "left",
  subtitle,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <header className={`flex flex-col ${alignClass} ${className}`}>
      <Tag className="tlc-heading-green text-[1.625rem] leading-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
        {children}
      </Tag>
      <span className={`tlc-accent-line ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle ? (
        <p
          className={`mt-3 max-w-2xl text-base leading-relaxed text-tlc-text-muted sm:mt-5 sm:text-lg ${
            align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
