import { socialLinks } from "@/lib/site";

function SocialIcon({
  icon,
  className = "h-[18px] w-[18px]",
}: {
  icon: string;
  className?: string;
}) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.2.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.7 1.1.3.3.6.5 1.1.7.4.2 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.2-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.4-.2-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.4a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zm0 1.8a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm6.4-4.9a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M19.6 6.2a4.6 4.6 0 0 1-3.3-1.3 4.6 4.6 0 0 1-1.3-3.3h-3.4v11.6l-.1 5.7a3.4 3.4 0 0 1-1.9-1.1 3.4 3.4 0 0 1-.7-2.1V9.6H4.8v3.4a7.2 7.2 0 0 0 2.1 5.1 7.2 7.2 0 0 0 5.1 2.1 7.2 7.2 0 0 0 5.1-2.1 7.2 7.2 0 0 0 2.1-5.1V6.2h-.6z" />
    </svg>
  );
}

type SocialLinksProps = {
  variant?: "icons" | "text";
  size?: "default" | "compact";
  className?: string;
};

const iconButtonSizes = {
  default: "h-10 w-10",
  compact: "h-9 w-9",
};

const iconSizes = {
  default: "h-[18px] w-[18px]",
  compact: "h-4 w-4",
};

export function SocialLinks({
  variant = "icons",
  size = "default",
  className = "",
}: SocialLinksProps) {
  if (variant === "text") {
    return (
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-tlc-text-muted transition-colors hover:text-tlc-green"
          >
            {social.label}
          </a>
        ))}
      </div>
    );
  }

  const buttonSize = iconButtonSizes[size];
  const iconSize = iconSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`flex ${buttonSize} items-center justify-center rounded-full border border-tlc-border bg-white text-tlc-text transition-all hover:border-tlc-green hover:bg-tlc-green-light hover:text-tlc-green-dark`}
        >
          <SocialIcon icon={social.icon} className={iconSize} />
        </a>
      ))}
    </div>
  );
}
