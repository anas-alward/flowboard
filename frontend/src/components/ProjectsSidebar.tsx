import React, { useState } from 'react';
import { FolderIcon, PlusIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProjectDialog from './CreateProjectDialog';
import type { RootState } from '../app/store';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupAction
} from './ui/sidebar';

const ProjectsSidebar: React.FC = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.workspace);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Projects
                <span className="ml-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-[10px] px-1.5 py-0.5 rounded-full">
                    {currentWorkspace?.projects?.length || 0}
                </span>
            </SidebarGroupLabel>
            <SidebarGroupAction onClick={() => setIsDialogOpen(true)} title="Add Project">
                <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    {currentWorkspace?.projects.map((project, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild tooltip={project.name}>
                                <Link to={`/projectsDetail?id=${project.id}&tab=tasks`} className="flex items-center gap-2 w-full">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                    <span className="truncate">{project.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    {(!currentWorkspace?.projects || currentWorkspace.projects.length === 0) && (
                        <div className="px-3 py-2 text-xs text-gray-500 dark:text-zinc-500 italic">
                            No projects found
                        </div>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
            <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </SidebarGroup>
    );
}

export default ProjectsSidebar;
