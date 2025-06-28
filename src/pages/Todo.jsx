import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Check,
    Edit2,
    Trash2,
    Square,
    CheckSquare,
} from "lucide-react";

export default function Todo() {
    const [taskInput, setTaskInput] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAddOrUpdate = () => {
        if (!taskInput.trim()) return;

        if (editIndex !== null) {
            setTasks((prev) =>
                prev.map((t, i) => (i === editIndex ? { ...t, text: taskInput } : t))
            );
            setEditIndex(null);
        } else {
            setTasks((prev) => [
                ...prev,
                { id: Date.now(), text: taskInput, completed: false },
            ]);
        }
        setTaskInput("");
    };

    const handleToggle = (id) =>
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );

    const handleEdit = (id) => {
        const idx = tasks.findIndex((t) => t.id === id);
        setTaskInput(tasks[idx].text);
        setEditIndex(idx);
    };

    const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));

    const remaining = tasks.filter((t) => !t.completed).length;

    return (
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-cyan-50 via-indigo-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                📝 To‑Do List
            </h1>

            {/* Input Card */}
            <div className="mt-8 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Enter your task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        className="col-span-1 sm:col-span-3 px-4 py-2 rounded-lg ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
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

            {/* Tasks List */}
            <div className="mt-10 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                {tasks.length ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-3 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700"
                            >
                                <button
                                    onClick={() => handleToggle(task.id)}
                                    aria-label="Toggle complete"
                                    className="p-1 rounded-lg hover:bg-emerald-600/20 dark:hover:bg-emerald-600/20"
                                >
                                    {task.completed ? (
                                        <CheckSquare className="h-6 w-6 text-emerald-600" />
                                    ) : (
                                        <Square className="h-6 w-6 text-slate-400" />
                                    )}
                                </button>
                                <p
                                    className={`flex-1 text-slate-800 dark:text-slate-100 ${task.completed ? "line-through opacity-60" : ""
                                        }`}
                                >
                                    {task.text}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(task.id)}
                                        aria-label="Edit"
                                        className="p-2 rounded-lg hover:bg-blue-600/20 dark:hover:bg-blue-600/20"
                                    >
                                        <Edit2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
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
                    <p className="text-center text-slate-500 dark:text-slate-400">No tasks yet.</p>
                )}
            </div>

            {/* Remaining tasks & Back link */}
            <div className="mt-6 flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {remaining} task{remaining !== 1 && "s"} remaining
                </p>
                <Link
                    to="/"
                    className="inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                    ← Back to Dashboard
                </Link>
            </div>
        </section>
    );
}
