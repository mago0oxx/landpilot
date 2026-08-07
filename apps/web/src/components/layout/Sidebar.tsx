"use client";

import Logo from "@/components/shared/Logo";
import TopoPattern from "@/components/shared/TopoPattern";
import {
    LayoutDashboard,
    Search,
    Map,
    BarChart3,
    BrainCircuit,
    Settings,
    LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Search,
        label: "Analyze",
        href: "/analize",
    },
    {
        icon: Map,
        label: "Properties",
        href: "/properties",
    },
    {
        icon: BarChart3,
        label: "Portfolio",
        href: "/portfolio",
    },
    {
        icon: BrainCircuit,
        label: "Intelligence",
        href: "/intelligence",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/settings",
    },
];
export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;
    const initial = (user?.name ?? user?.email ?? "?").charAt(0).toUpperCase();

    return (
        <aside className="relative flex h-screen w-72 flex-col overflow-hidden bg-lp-forest px-6 py-8">
            <TopoPattern />

            <div className="relative z-10">
                <Logo showTagline={false} href="/dashboard" />
            </div>

            <nav className="relative z-10 mt-12 flex flex-1 flex-col gap-2">
                {menuItems.map(({ icon: Icon, label, href }) => {
                    const active = href !== null && pathname.startsWith(href);
                    const className = `flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                        active
                            ? "bg-lp-gold text-lp-gold-ink font-medium"
                            : href
                              ? "text-lp-mint/80 hover:bg-white/5 hover:text-lp-cream"
                              : "cursor-not-allowed text-white/25"
                    }`;

                    if (!href) {
                        return (
                            <span key={label} className={className}>
                                <Icon size={20} />
                                <span>{label}</span>
                            </span>
                        );
                    }

                    return (
                        <Link key={label} href={href} className={className}>
                            <Icon size={20} />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {user ? (
                <div className="relative z-10 mt-auto flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-lp-cream">
                        {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-lp-cream">{user.name ?? user.email}</p>
                        <p className="truncate text-xs text-lp-mint/60">{user.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="shrink-0 rounded-lg p-2 text-lp-mint/70 transition hover:bg-white/10 hover:text-lp-cream"
                        aria-label="Sign out"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="relative z-10 mt-auto flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:bg-white/5"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-lp-cream">
                        ?
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-lp-cream">Sign in</p>
                    </div>
                </Link>
            )}
        </aside>
    );
}
