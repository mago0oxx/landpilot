import Link from "next/link";

interface DisclaimerNoteProps {
  variant?: "card" | "inline";
}

const TEXT =
  "LandPilot provides an informational analysis based on available data — it does not constitute financial, legal, or professional investment advice. Consult a licensed professional before making investment decisions.";

export default function DisclaimerNote({ variant = "inline" }: DisclaimerNoteProps) {
  if (variant === "card") {
    return (
      <div className="rounded-xl border border-lp-border bg-stone-50 p-4 text-xs leading-relaxed text-stone-500">
        <p>{TEXT}</p>
        <p className="mt-1">
          <Link href="/terms" className="underline hover:text-lp-ink">
            Terms
          </Link>{" "}
          ·{" "}
          <Link href="/privacy" className="underline hover:text-lp-ink">
            Privacy
          </Link>
        </p>
      </div>
    );
  }

  return (
    <p className="text-center text-[11px] leading-relaxed text-stone-400">
      {TEXT}{" "}
      <Link href="/terms" className="underline hover:text-stone-600">
        Terms
      </Link>{" "}
      ·{" "}
      <Link href="/privacy" className="underline hover:text-stone-600">
        Privacy
      </Link>
    </p>
  );
}
