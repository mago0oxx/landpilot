import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  /** Wraps the logo in a link when provided (e.g. "/dashboard" from the app shell, "/" from
   * the public auth pages) — omit to render it as plain, non-interactive markup. */
  href?: string;
};

const sizeClasses = {
  sm: {
    title: "text-xl",
    subtitle: "text-xs",
  },
  md: {
    title: "text-3xl",
    subtitle: "text-sm",
  },
  lg: {
    title: "text-5xl",
    subtitle: "text-lg",
  },
};

export default function Logo({
  size = "md",
  showTagline = true,
  href,
}: LogoProps) {
  const styles = sizeClasses[size];

  const content = (
    <div className="flex select-none items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lp-forest-light">
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="#A8D4BA" strokeWidth="1.4" fill="none" />
          <circle cx="7" cy="7" r="2" fill="#A8D4BA" />
        </svg>
      </div>
      <div>
        <h1 className={`font-bold tracking-tight text-lp-cream ${styles.title}`}>
          Land<span className="text-lp-gold">Pilot</span>
        </h1>

        {showTagline && (
          <p className={`text-lp-mint/70 ${styles.subtitle}`}>
            Analyze. Invest. Grow.
          </p>
        )}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-block transition hover:opacity-90">
      {content}
    </Link>
  );
}