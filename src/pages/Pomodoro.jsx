import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {
    const DEFAULT_SECONDS = 25 * 60; // 25 minutes
    const [timeLeft, setTimeLeft] = useState(DEFAULT_SECONDS);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const toggle = () => setIsRunning((p) => !p);
    const reset = () => {
        setIsRunning(false);
        setTimeLeft(DEFAULT_SECONDS);
    };

    // progress percent for bg ring (optional visual flair)
    const percent = 100 - (timeLeft / DEFAULT_SECONDS) * 100;

    return (
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-14 pb-10 px-4 sm:px-6 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white text-center drop-shadow">
                ⏱️ Pomodoro
            </h1>

            {/* Timer Card */}
            <div className="relative mt-10 w-60 h-60 flex items-center justify-center rounded-full bg-white/70 dark:bg-slate-800/80 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 backdrop-blur-md">
                {/* SVG circular progress */}
                <svg
                    className="absolute inset-0 rotate-[-90deg]"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-200 dark:text-slate-700 fill-none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="282.6"
                        strokeDashoffset={`${(282.6 * (100 - percent)) / 100}`}
                        className="text-emerald-500 dark:text-emerald-400 fill-none transition-all duration-1000 ease-linear"
                    />
                </svg>

                {/* Time */}
                <span className="text-4xl sm:text-5xl font-mono text-slate-800 dark:text-white z-10">
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-6">
                <button
                    onClick={toggle}
                    disabled={timeLeft === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <RotateCcw className="h-5 w-5" /> Reset
                </button>
            </div>

            {/* Back to Dashboard */}
            <Link
                to="/"
                className="mt-10 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
                ← Back to Dashboard
            </Link>
        </section>
    );
}