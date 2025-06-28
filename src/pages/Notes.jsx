import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Check, Edit2, Trash2 } from "lucide-react";

export default function Notes() {
    const [noteInput, setNoteInput] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("notes");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const handleAddOrUpdate = () => {
        if (!noteInput.trim()) return;

        if (editIndex !== null) {
            setNotes((prev) =>
                prev.map((n, i) => (i === editIndex ? { ...n, text: noteInput } : n))
            );
            setEditIndex(null);
        } else {
            setNotes((prev) => [...prev, { id: Date.now(), text: noteInput }]);
        }
        setNoteInput("");
    };

    const handleEdit = (id) => {
        const idx = notes.findIndex((n) => n.id === id);
        setNoteInput(notes[idx].text);
        setEditIndex(idx);
    };

    const handleDelete = (id) => setNotes(notes.filter((n) => n.id !== id));

    return (
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-rose-50 via-violet-50 to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                📒 Notes
            </h1>

            {/* Input Card */}
            <div className="mt-8 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="flex flex-col gap-4">
                    <textarea
                        rows={3}
                        placeholder="Enter your note..."
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        className="w-full resize-none rounded-lg px-4 py-3 ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900/60 dark:text-slate-100"
                    />
                    <button
                        onClick={handleAddOrUpdate}
                        className="self-end flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {editIndex !== null ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="mt-10 w-full max-w-3xl rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md p-6 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
                {notes.length ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {notes.map((note) => (
                            <li
                                key={note.id}
                                className="flex items-start gap-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-3 rounded-xl ring-1 ring-slate-200 dark:ring-slate-700"
                            >
                                <p className="flex-1 text-slate-700 dark:text-slate-100 whitespace-pre-wrap">
                                    {note.text}
                                </p>
                                <div className="flex items-center gap-2 self-center">
                                    <button
                                        onClick={() => handleEdit(note.id)}
                                        aria-label="Edit"
                                        className="p-2 rounded-lg hover:bg-blue-600/20 dark:hover:bg-blue-600/20"
                                    >
                                        <Edit2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
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
                    <p className="text-center text-slate-500 dark:text-slate-400">No notes yet.</p>
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
