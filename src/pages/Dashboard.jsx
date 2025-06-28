import { Link } from "react-router-dom";
import {
    CheckSquare,
    FileText,
    CalendarDays,
    Timer,
    Wallet,
} from "lucide-react";

export default function Dashboard() {
    const tools = [
        { to: "/todo", icon: CheckSquare, label: "To‑Do List" },
        { to: "/notes", icon: FileText, label: "Notes" },
        { to: "/planner", icon: CalendarDays, label: "Planner" },
        { to: "/pomodoro", icon: Timer, label: "Pomodoro" },
        { to: "/expenses", icon: Wallet, label: "Expense Tracker" },
    ];

    return (
        <section className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                👋 Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
                    DayCraft
                </span>
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-pink-600 dark:text-pink-400">
                Select a tool to get started:
            </p>

            {/* Card grid */}
            <div className="mt-10 grid w-full max-w-5xl gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map(({ to, icon: Icon, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        {/* subtle animated gradient background */}
                        <div className="absolute inset-0 -z-10 scale-150 bg-gradient-to-br from-blue-400/20 via-pink-400/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Icon */}
                        <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400 drop-shadow group-hover:scale-110 transition-transform duration-300" />

                        {/* Label */}
                        <span className="mt-4 block text-lg font-semibold text-slate-800 dark:text-slate-100">
                            {label}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}