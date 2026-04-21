import React, { useState } from 'react';
import { FolderIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProjectDialog from './CreateProjectDialog';
import type { RootState } from '../app/store';

const ProjectsSidebar: React.FC = () => {
    const { currentWorkspace } = useSelector((state: RootState) => state.workspace);
    const [showProjects, setShowProjects] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleProjects = () => setShowProjects(prev => !prev);

    return (
        <div className="mt-6 px-3">
            <div className="flex items-center justify-between px-3 py-2 group">
                <div onClick={toggleProjects} className="flex items-center gap-2 cursor-pointer flex-1">
                    <FolderIcon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    <h3 className="text-sm font-medium text-gray-700 dark:text-zinc-300">Projects</h3>
                    <span className="bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-xs px-2 py-0.5 rounded">
                        {currentWorkspace?.projects?.length || 0}
                    </span>
                    {showProjects ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    ) : (
                        <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    )}
                </div>
                <button onClick={() => setIsDialogOpen(true)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition opacity-0 group-hover:opacity-100">
                    <PlusIcon className="w-3.5 h-3.5 text-gray-500 dark:text-zinc-400" />
                </button>
            </div>

            {showProjects && (
                <div className="mt-2 space-y-1 pl-2">
                    {currentWorkspace?.projects.map((project, index) => (
                        <Link key={index} to={`/projectsDetail?id=${project.id}&tab=tasks`} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white rounded-lg transition-colors group" >
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="truncate flex-1">{project.name}</span>
                        </Link>
                    ))}
                    {(!currentWorkspace?.projects || currentWorkspace.projects.length === 0) && (
                        <div className="px-3 py-2 text-xs text-gray-500 dark:text-zinc-500 text-center italic">
                            No projects found
                        </div>
                    )}
                </div>
            )}
            <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </div>
    );
}

export default ProjectsSidebar;
