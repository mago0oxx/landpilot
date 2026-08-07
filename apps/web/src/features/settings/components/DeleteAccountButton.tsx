"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete your LandPilot account? This permanently deletes your account, every analysis, and your portfolio. This can't be undone."
    );
    if (!confirmed) return;

    setError(undefined);
    setIsDeleting(true);
    try {
      const response = await fetch("/api/account", { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to delete account.");
      }
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account.");
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="!bg-red-600 !text-white hover:!brightness-105"
      >
        {isDeleting ? "Deleting..." : "Delete account"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
