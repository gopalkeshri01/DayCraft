import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const links = [
        { to: "/", label: "Dashboard" },
        { to: "/todo", label: "Todo" },
        { to: "/notes", label: "Notes" },
        { to: "/planner", label: "Planner" },
        { to: "/pomodoro", label: "Pomodoro" },
        { to: "/expenses", label: "Expenses" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/70 dark:bg-slate-900/70 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
                {/* Brand */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600"
                >
                    DayCraft
                </Link>

                {/* Desktop navigation */}
                <ul className="hidden md:flex items-center gap-6">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Hamburger */}
                <button
                    onClick={() => setOpen((p) => !p)}
                    aria-label="Toggle navigation"
                    className="md:hidden p-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 backdrop-blur transition-colors hover:bg-slate-200/70 dark:hover:bg-slate-700/70"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile dropdown – use max-height so collapsed state takes zero space */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <ul className="space-y-2 px-6 pb-4 pt-2">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
