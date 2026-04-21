import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../app/store';
import type { Task } from '../types';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from './ui/sidebar';

const MyTasksSidebar: React.FC = () => {
    const user = { id: 'user_1' } // Mock user

    const { currentWorkspace } = useSelector((state: RootState) => state.workspace);
    const [myTasks, setMyTasks] = useState<Task[]>([]);

    const getTaskStatusColor = (status: string) => {
        switch (status) {
            case 'DONE':
                return 'bg-green-500';
            case 'IN_PROGRESS':
                return 'bg-yellow-500';
            case 'TODO':
                return 'bg-gray-500 dark:bg-zinc-500';
            default:
                return 'bg-gray-400 dark:bg-zinc-400';
        }
    };

    const fetchUserTasks = () => {
        const userId = user?.id || '';
        if (!userId || !currentWorkspace) return;
        const currentWorkspaceTasks = currentWorkspace.projects.flatMap((project) => {
            return project.tasks.filter((task) => task?.assignee?.id === userId);
        });

        setMyTasks(currentWorkspaceTasks);
    }

    useEffect(() => {
        fetchUserTasks()
    }, [currentWorkspace])

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                My Tasks
                <span className="ml-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-[10px] px-1.5 py-0.5 rounded-full">
                    {myTasks.length}
                </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {myTasks.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-gray-500 dark:text-zinc-500 italic">
                            No tasks assigned
                        </div>
                    ) : (
                        myTasks.map((task, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild tooltip={task.title} className="h-auto py-2">
                                    <Link to={`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`} className="flex items-start gap-2 w-full">
                                        <div className={`w-2 h-2 mt-1.5 rounded-full ${getTaskStatusColor(task.status)} flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate leading-tight">
                                                {task.title}
                                            </p>
                                            <p className="text-[10px] text-gray-500 dark:text-zinc-500 lowercase">
                                                {task.status.replace('_', ' ')}
                                            </p>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default MyTasksSidebar;
