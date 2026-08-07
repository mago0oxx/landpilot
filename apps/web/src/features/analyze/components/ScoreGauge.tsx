const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ScoreGaugeProps {
  score: number;
  max?: number;
  size?: number;
}

/** Circular LPS Score gauge — the score's visual centerpiece on the analysis result page. */
export default function ScoreGauge({ score, max = 1000, size = 120 }: ScoreGaugeProps) {
  const fraction = Math.max(0, Math.min(1, score / max));
  const dashArray = `${fraction * CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#EEECE5" strokeWidth="8" />
      <circle
        cx="60"
        cy="60"
        r={RADIUS}
        fill="none"
        stroke="#C9943A"
        strokeWidth="8"
        strokeDasharray={dashArray}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="57"
        textAnchor="middle"
        className="font-mono"
        fontSize="30"
        fontWeight="700"
        fill="#1C1C1A"
      >
        {Math.round(score)}
      </text>
      <text
        x="60"
        y="73"
        textAnchor="middle"
        className="font-sans"
        fontSize="9"
        fontWeight="600"
        fill="#9A9A92"
        letterSpacing="0.8"
      >
        LPS SCORE
      </text>
    </svg>
  );
}
