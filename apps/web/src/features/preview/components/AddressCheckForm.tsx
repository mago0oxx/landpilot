"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface AddressCheckFormProps {
  /** `hero` is the light-on-cream marketing variant; `inline` is the boxed guide CTA. */
  variant?: "hero" | "inline";
  buttonLabel?: string;
}

export default function AddressCheckForm({
  variant = "hero",
  buttonLabel = "Check this lot free",
}: AddressCheckFormProps) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!address.trim()) return;

    setIsSubmitting(true);
    setError(undefined);

    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const body = (await response.json().catch(() => null)) as { id?: string; error?: string } | null;

      if (!response.ok || !body?.id) {
        setError(body?.error ?? "Something went wrong checking that address. Try again.");
        setIsSubmitting(false);
        return;
      }

      // Left in the loading state on purpose — the push is a navigation, and flipping the
      // button back to idle first makes it look like nothing happened.
      router.push(`/check/${body.id}`);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="123 Main St, Tampa, FL"
          aria-label="Property address"
          autoComplete="street-address"
          className={`flex-1 rounded-xl border px-4 py-3.5 text-sm text-lp-ink outline-none transition placeholder:text-stone-400 focus:border-lp-forest ${
            variant === "hero" ? "border-lp-forest/20 bg-white" : "border-stone-300 bg-white"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting || address.trim().length < 6}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-lp-gold px-6 py-3.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Checking...
            </>
          ) : (
            <>
              {buttonLabel} <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <p className="mt-3 text-xs text-stone-500">
        No account needed. Pulls FEMA flood maps, the federal wetlands inventory and Census data
        for the parcel.
      </p>
    </form>
  );
}
