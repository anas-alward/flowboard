import React, { useMemo } from "react";
import { Plus, MoreVertical, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import type { Project, Task } from "../types";

interface ProjectTasksProps {
    project: Project;
    tasks: Task[];
    setShowCreateTask: (show: boolean) => void;
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({ tasks, setShowCreateTask }) => {

    const columns = [
        { id: "TODO", title: "To Do", color: "bg-zinc-200 dark:bg-zinc-800" },
        { id: "IN_PROGRESS", title: "In Progress", color: "bg-blue-200 dark:bg-blue-500/20" },
        { id: "DONE", title: "Done", color: "bg-emerald-200 dark:bg-emerald-500/20" },
    ];

    const tasksByStatus = useMemo(() => {
        return {
            TODO: tasks.filter((t) => t.status === "TODO"),
            IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
            DONE: tasks.filter((t) => t.status === "DONE"),
        };
    }, [tasks]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "HIGH": return "text-red-600 bg-red-200 dark:bg-red-500/10 dark:text-red-400";
            case "MEDIUM": return "text-amber-600 bg-amber-200 dark:bg-amber-500/10 dark:text-amber-400";
            case "LOW": return "text-emerald-600 bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400";
            default: return "text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "BUG": return "bg-red-500";
            case "FEATURE": return "bg-blue-500";
            case "IMPROVEMENT": return "bg-purple-500";
            default: return "bg-zinc-500";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
            {columns.map((column) => (
                <div key={column.id} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-200">{column.title}</h3>
                            <span className="text-sm px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
                                {tasksByStatus[column.id as keyof typeof tasksByStatus].length}
                            </span>
                        </div>
                        {column.id === "TODO" && (
                            <button onClick={() => setShowCreateTask(true)} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md text-zinc-600 dark:text-zinc-400 transition" >
                                <Plus size={18} />
                            </button>
                        )}
                    </div>

                    <div className={`flex-1 rounded-xl p-3 space-y-4 ${column.color}`}>
                        {tasksByStatus[column.id as keyof typeof tasksByStatus].map((task) => (
                            <div key={task.id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group" >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-4 rounded-full ${getTypeColor(task.type)}`} />
                                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 tracking-wider">
                                            {task.type}
                                        </span>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition text-zinc-400">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>

                                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-2">{task.title}</h4>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                    {task.due_date && (
                                        <span className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                            <Clock size={10} />
                                            {format(new Date(task.due_date), "MMM d")}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex -space-x-2">
                                        {task.assignee ? (
                                            <div className="size-6 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold" >
                                                {task.assignee.email.charAt(0).toUpperCase()}
                                            </div>
                                        ) : (
                                            <div className="size-6 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400" >
                                                <Plus size={10} />
                                            </div>
                                        )}
                                    </div>
                                    {task.status !== "DONE" && task.due_date && new Date(task.due_date) < new Date() && (
                                        <AlertCircle size={14} className="text-red-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectTasks;
