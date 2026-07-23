import Logo from "@/components/shared/Logo";
import {
    LayoutDashboard,
    Search,
    Map,
    BarChart3,
    BrainCircuit,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        active: true,
    },
    {
        icon: Search,
        label: "Analyze",
        active: false,
    },
    {
        icon: Map,
        label: "Properties",
        active: false,
    },
    {
        icon: BarChart3,
        label: "Portfolio",
        active: false,
    },
    {
        icon: BrainCircuit,
        label: "Intelligence",
        active: false,
    },
    {
        icon: Settings,
        label: "Settings",
        active: false,
    },
];
export default function Sidebar() {
    return (
        <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-8">
            <Logo showTagline={false} />

            <nav className="mt-12 flex flex-col gap-2">
                {menuItems.map(({ icon: Icon, label , active }) => (
                    <button
                        key={label}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${active
                                ? "bg-green-600 text-white"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            }`}
                    >
                        <Icon size={20} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}