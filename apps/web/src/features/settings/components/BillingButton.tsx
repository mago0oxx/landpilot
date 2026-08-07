"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { PlanId } from "@/lib/plans";

type BillingButtonProps =
  | { mode: "checkout"; plan: Exclude<PlanId, "free">; label?: string }
  | { mode: "portal"; plan?: never; label?: string };

export default function BillingButton(props: BillingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function handleClick() {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch(`/api/stripe/${props.mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: props.mode === "checkout" ? JSON.stringify({ plan: props.plan }) : undefined,
      });
      const body = await response.json();
      if (!response.ok || !body.url) {
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      window.location.href = body.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  const defaultLabel = props.mode === "portal" ? "Manage billing" : `Upgrade to ${props.plan === "pro" ? "Pro" : "Starter"}`;

  return (
    <div>
      <Button type="button" onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Redirecting…" : (props.label ?? defaultLabel)}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
