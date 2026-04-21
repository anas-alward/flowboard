import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";
import type { Project, Task } from "../types";

// Colors for charts and priorities
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface ProjectAnalyticsProps {
    project: Project;
    tasks: Task[];
}

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ project, tasks }) => {
    const { stats, statusData, typeData } = useMemo(() => {
        const now = new Date();
        const total = tasks.length;

        const stats = {
            total,
            completed: 0,
            inProgress: 0,
            todo: 0,
            overdue: 0,
        };

        const statusMap: Record<string, number> = { TODO: 0, IN_PROGRESS: 0, DONE: 0 };
        const typeMap: Record<string, number> = { TASK: 0, BUG: 0, FEATURE: 0, IMPROVEMENT: 0, OTHER: 0 };

        tasks.forEach((t) => {
            if (t.status === "DONE") stats.completed++;
            if (t.status === "IN_PROGRESS") stats.inProgress++;
            if (t.status === "TODO") stats.todo++;
            if (t.due_date && new Date(t.due_date) < now && t.status !== "DONE") stats.overdue++;

            if (statusMap[t.status] !== undefined) statusMap[t.status]++;
            if (typeMap[t.type] !== undefined) typeMap[t.type]++;
        });

        return {
            stats,
            statusData: Object.entries(statusMap).map(([k, v]) => ({ name: k.replace("_", " "), value: v })),
            typeData: Object.entries(typeMap).filter(([_, v]) => v > 0).map(([k, v]) => ({ name: k, value: v })),
        };
    }, [tasks]);

    const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

    const metrics = [
        {
            label: "Completion Rate",
            value: `${completionRate}%`,
            color: "text-emerald-600 dark:text-emerald-400",
            icon: <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />,
            bg: "bg-emerald-200 dark:bg-emerald-500/10",
        },
        {
            label: "Active Tasks",
            value: stats.inProgress,
            color: "text-blue-600 dark:text-blue-400",
            icon: <Clock className="size-5 text-blue-600 dark:text-blue-400" />,
            bg: "bg-blue-200 dark:bg-blue-500/10",
        },
        {
            label: "Overdue Tasks",
            value: stats.overdue,
            color: "text-red-600 dark:text-red-400",
            icon: <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />,
            bg: "bg-red-200 dark:bg-red-500/10",
        },
        {
            label: "Team Size",
            value: project?.members?.length || 0,
            color: "text-purple-600 dark:text-purple-400",
            icon: <Users className="size-5 text-purple-600 dark:text-purple-400" />,
            bg: "bg-purple-200 dark:bg-purple-500/10",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div
                        key={i}
                        className="not-dark:bg-white dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{m.label}</p>
                                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                            </div>
                            <div className={`p-2 rounded-md ${m.bg}`}>{m.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

             {/* Chart Section */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Status Distribution */}
                <div className="not-dark:bg-white dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-6">Status Distribution</h3>
                    <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>

                {/* Type Breakdown */}
                <div className="not-dark:bg-white dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-6">Type Breakdown</h3>
                    <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectAnalytics;
