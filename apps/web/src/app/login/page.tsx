import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";
import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue analyzing land investments."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-lp-forest hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <LoginForm googleEnabled={googleEnabled} />
    </AuthCard>
  );
}
