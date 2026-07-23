type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
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
}: LogoProps) {
  const styles = sizeClasses[size];

  return (
    <div className="select-none">
      <h1
        className={`font-bold tracking-tight text-white ${styles.title}`}
      >
        <span className="text-green-500">Land</span>Pilot
      </h1>

      {showTagline && (
        <p className={`text-zinc-400 ${styles.subtitle}`}>
          Analyze. Invest. Grow.
        </p>
      )}
    </div>
  );
}