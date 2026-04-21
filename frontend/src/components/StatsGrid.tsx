import React from 'react';
import { Layout, CheckCircle, Clock, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const StatsGrid: React.FC = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.workspace);

    const projectsTotal = currentWorkspace?.projects?.length || 0;
    const tasks = currentWorkspace?.projects?.flatMap(p => p.tasks) || [];
    const tasksTotal = tasks.length;
    const tasksDone = tasks.filter(t => t.status === 'DONE').length;
    const membersTotal = currentWorkspace?.members?.length || 0;

    const stats = [
        { label: 'Total Projects', value: projectsTotal, icon: Layout, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Tasks Completed', value: tasksDone, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Tasks', value: tasksTotal - tasksDone, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Team Members', value: membersTotal, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:shadow-md transition-shadow cursor-default" >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl dark:bg-zinc-800 ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsGrid;
