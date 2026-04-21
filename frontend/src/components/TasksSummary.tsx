import React from "react";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const TasksSummary: React.FC = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.workspace);

    const tasks = currentWorkspace?.projects.flatMap((p) => p.tasks) || [];
    const counts = {
        todo: tasks.filter((t) => t.status === "TODO").length,
        inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        done: tasks.filter((t) => t.status === "DONE").length,
    };

    const summaries = [
        { label: "To Do", count: counts.todo, icon: <ListTodo size={18} />, color: "text-zinc-600 dark:text-zinc-400", bg: "bg-zinc-100 dark:bg-zinc-800" },
        { label: "In Progress", count: counts.inProgress, icon: <Clock size={18} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Completed", count: counts.done, icon: <CheckCircle2 size={18} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    ];

    return (
        <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
            <h2 className="text-md text-zinc-800 dark:text-zinc-300 mb-6">Task Distribution</h2>
            <div className="space-y-4">
                {summaries.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md ${item.bg} ${item.color}`}>
                                {item.icon}
                            </div>
                            <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                {item.label}
                            </span>
                        </div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                            {item.count}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <div className="flex h-2 w-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <div className="bg-zinc-400" style={{ width: `${(counts.todo / tasks.length) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(counts.inProgress / tasks.length) * 100}%` }} />
                    <div className="bg-emerald-500" style={{ width: `${(counts.done / tasks.length) * 100}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-tighter">
                    <span>{tasks.length} Total Tasks</span>
                    <span>{counts.done} Completed</span>
                </div>
            </div>
        </div>
    );
};

export default TasksSummary;
