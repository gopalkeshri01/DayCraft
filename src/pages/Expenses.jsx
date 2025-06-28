import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Plus, Check } from "lucide-react";

export default function Expenses() {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem("expenses");
        return saved ? JSON.parse(saved) : [];
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const handleAddExpense = () => {
        if (!expenseName.trim() || !expenseAmount.trim()) return;

        if (editIndex !== null) {
            const updated = [...expenses];
            updated[editIndex] = {
                ...updated[editIndex],
                name: expenseName,
                amount: parseFloat(expenseAmount),
            };
            setExpenses(updated);
            setEditIndex(null);
        } else {
            setExpenses((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    name: expenseName,
                    amount: parseFloat(expenseAmount),
                },
            ]);
        }
        setExpenseName("");
        setExpenseAmount("");
    };

    const handleDelete = (id) => setExpenses(expenses.filter((e) => e.id !== id));

    const handleEdit = (id) => {
        const index = expenses.findIndex((e) => e.id === id);
        setExpenseName(expenses[index].name);
        setExpenseAmount(expenses[index].amount.toString());
        setEditIndex(index);
    };

    const total = expenses.reduce((sum, { amount }) => sum + amount, 0);

    return (
        <section className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                💸 Expense Tracker
            </h1>

            {/* Input Card */}
            <div className="mt-8 w-full max-w-xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Expense Name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="col-span-1 sm:col-span-1 px-4 py-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
                    />
                    <input
                        type="number"
                        min="0"
                        placeholder="Amount"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        className="col-span-1 sm:col-span-1 px-4 py-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
                    />
                    <button
                        onClick={handleAddExpense}
                        className="col-span-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {editIndex !== null ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </div>
            </div>

            {/* List Card */}
            <div className="mt-10 w-full max-w-xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                {expenses.length ? (
                    <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {expenses.map((e) => (
                            <li
                                key={e.id}
                                className="flex items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-3 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-100">
                                    {e.name}
                                </span>
                                <span className="ml-auto font-semibold text-emerald-600 dark:text-emerald-400">
                                    ₹{e.amount}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(e.id)}
                                        aria-label="Edit"
                                        className="p-2 rounded-lg hover:bg-blue-600/20 dark:hover:bg-blue-600/20"
                                    >
                                        <Edit2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(e.id)}
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
                    <p className="text-center text-slate-500 dark:text-slate-400">No expenses added yet.</p>
                )}
            </div>

            {/* Total Card */}
            <div className="mt-6 w-full max-w-xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-4 text-center shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Total: <span className="text-emerald-600 dark:text-emerald-400">₹{total}</span>
                </h2>
            </div>

            {/* Back to Dashboard link */}
            <Link
                to="/"
                className="mt-8 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
                ← Back to Dashboard
            </Link>
        </section>
    );
}
