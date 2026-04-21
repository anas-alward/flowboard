import React from "react";
import { MessageSquare, CheckCircle, Clock, UserPlus, Tag } from "lucide-react";
import { format } from "date-fns";

const RecentActivity: React.FC = () => {
    // Mock activities for now
    const activities = [
        {
            user: "Alex Rivera",
            action: "completed task",
            target: "Update API Documentation",
            time: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
            icon: <CheckCircle size={14} className="text-emerald-500" />,
            type: "task",
        },
        {
            user: "Sarah Chen",
            action: "commented on",
            target: "Frontend Redesign",
            time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            icon: <MessageSquare size={14} className="text-blue-500" />,
            type: "comment",
        },
        {
            user: "Marcus Wright",
            action: "moved task to In Progress",
            target: "Database Migration",
            time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            icon: <Clock size={14} className="text-amber-500" />,
            type: "status",
        },
        {
            user: "Leo Garcia",
            action: "invited",
            target: "Elena Rodriguez",
            time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            icon: <UserPlus size={14} className="text-purple-500" />,
            type: "invite",
        },
        {
            user: "Me",
            action: "added label",
            target: "Critical Bug",
            time: new Date(Date.now() - 1000 * 60 * 60 * 26), // 1 day ago
            icon: <Tag size={14} className="text-rose-500" />,
            type: "tag",
        },
    ];

    return (
        <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden h-fit">
            <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
                <h2 className="text-md text-zinc-800 dark:text-zinc-300">Recent Activity</h2>
            </div>
            <div className="p-4 space-y-6">
                {activities.map((activity, i) => (
                    <div key={i} className="flex gap-4 relative">
                        {i !== activities.length - 1 && (
                            <div className="absolute left-[11px] top-6 bottom-[-24px] w-[1px] bg-zinc-100 dark:bg-zinc-800" />
                        )}
                        <div className="size-6 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 z-10">
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                                <span className="font-medium text-zinc-900 dark:text-zinc-200">{activity.user}</span>{" "}
                                {activity.action}{" "}
                                <span className="font-medium text-blue-600 dark:text-blue-400 italic">
                                    {activity.target}
                                </span>
                            </p>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                                {format(activity.time, "MMM d 'at' h:mm a")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
