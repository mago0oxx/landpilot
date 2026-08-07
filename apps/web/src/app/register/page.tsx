import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/features/auth/components/AuthCard";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { auth } from "@/auth";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start analyzing land investments with the LPS Engine."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-lp-forest hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm googleEnabled={googleEnabled} />
    </AuthCard>
  );
}
