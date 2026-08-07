import { ReactNode } from "react";
import Logo from "@/components/shared/Logo";
import TopoPattern from "@/components/shared/TopoPattern";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-lp-cream p-6">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-lp-border bg-white shadow-sm">
          <div className="relative overflow-hidden bg-lp-forest px-8 py-6">
            <TopoPattern />
            <div className="relative z-10">
              <Logo showTagline={false} href="/" />
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-semibold text-lp-ink">{title}</h1>
            <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </div>

        {footer && <p className="mt-6 text-center text-sm text-stone-500">{footer}</p>}
      </div>
    </div>
  );
}
