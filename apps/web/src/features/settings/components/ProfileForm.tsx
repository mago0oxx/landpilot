"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";

export default function ProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(undefined);
    setSuccess(false);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to update profile.");
      }
      setSuccess(true);
      // A plain router.refresh() only re-renders server components — the Sidebar/Header
      // read the name from the client-side session cache, which won't pick up the change
      // until the session is refetched. A full reload is the reliable way to do that.
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Name" htmlFor="profile-name">
        <TextInput id="profile-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormField>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Profile updated.</p>}

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
