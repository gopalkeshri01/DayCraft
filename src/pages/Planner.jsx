import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Check, Edit2, Trash2, Clock } from "lucide-react";

export default function Planner() {
    const [plans, setPlans] = useState(() => {
        const saved = localStorage.getItem("plans");
        return saved ? JSON.parse(saved) : [];
    });
    const [planText, setPlanText] = useState("");
    const [planTime, setPlanTime] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
    }, [plans]);

    const handleAddOrUpdate = () => {
        if (!planText.trim() || !planTime.trim()) return;

        if (editIndex !== null) {
            setPlans((prev) =>
                prev.map((p, i) =>
                    i === editIndex ? { ...p, text: planText, time: planTime } : p
                )
            );
            setEditIndex(null);
        } else {
            setPlans((prev) => [
                ...prev,
                { id: Date.now(), text: planText, time: planTime },
            ]);
        }
        setPlanText("");
        setPlanTime("");
    };

    const handleEdit = (id) => {
        const idx = plans.findIndex((p) => p.id === id);
        setPlanText(plans[idx].text);
        setPlanTime(plans[idx].time);
        setEditIndex(idx);
    };

    const handleDelete = (id) => setPlans(plans.filter((p) => p.id !== id));

    return (
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                📅 Daily Planner
            </h1>

            {/* Input Card */}
            <div className="mt-8 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Plan description"
                        value={planText}
                        onChange={(e) => setPlanText(e.target.value)}
                        className="col-span-1 sm:col-span-2 px-4 py-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
                    />
                    <input
                        type="time"
                        value={planTime}
                        onChange={(e) => setPlanTime(e.target.value)}
                        className="col-span-1 px-4 py-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
                    />
                    <button
                        onClick={handleAddOrUpdate}
                        className="col-span-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {editIndex !== null ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </div>
            </div>

            {/* Plans List */}
            <div className="mt-10 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                {plans.length ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {plans.map((plan) => (
                            <li
                                key={plan.id}
                                className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-3 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700"
                            >
                                <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                <div className="flex-1">
                                    <p className="font-medium text-slate-800 dark:text-slate-100">
                                        {plan.text}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {plan.time}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(plan.id)}
                                        aria-label="Edit"
                                        className="p-2 rounded-lg hover:bg-blue-600/20 dark:hover:bg-blue-600/20"
                                    >
                                        <Edit2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan.id)}
                                        aria-label="Delete"
                                        className="p-2 rounded-lg hover:bg-red-600/20 dark:hover:bg-red-600/20"
                                    >
                                        <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400">No plans yet.</p>
                )}
            </div>

            {/* Back to Dashboard */}
            <Link
                to="/"
                className="mt-8 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
                ← Back to Dashboard
            </Link>
        </section>
    );
}