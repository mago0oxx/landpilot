import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { getPreview } from "@/features/preview/services/previewStore";
import { auth } from "@/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const { preview: previewId } = await searchParams;
  // Only carry it through if it actually resolves — a stale or hand-typed id shouldn't
  // change the copy or send the new user to a form we can't prefill.
  const preview = previewId ? await getPreview(previewId) : null;

  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <AuthCard
      title="Create your account"
      subtitle={
        preview
          ? `We'll carry ${preview.address} straight into your first full analysis.`
          : "Start analyzing land investments with the LPS Engine."
      }
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-lp-forest hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm googleEnabled={googleEnabled} previewId={preview?.id} />
    </AuthCard>
  );
}
