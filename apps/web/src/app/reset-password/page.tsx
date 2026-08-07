import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/features/auth/components/AuthCard";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { auth } from "@/auth";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const { token } = await searchParams;

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Choose a new password for your account."
      footer={
        <>
          Back to{" "}
          <Link href="/login" className="font-medium text-lp-forest hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-sm text-red-700">
          This reset link is missing its token. Request a new one from the{" "}
          <Link href="/forgot-password" className="font-medium underline">
            forgot password
          </Link>{" "}
          page.
        </p>
      )}
    </AuthCard>
  );
}
