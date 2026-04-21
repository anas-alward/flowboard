import React from 'react';
import { ChevronDown, Plus, Check, Settings, Layout } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "./ui/dropdown-menu";

const WorkspaceDropdown: React.FC = () => {
    const { currentWorkspace, workspaces } = useSelector((state: RootState) => state.workspace);

    if (!currentWorkspace) return (
        <div className="w-full flex items-center justify-center p-4">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition duration-200 outline-none focus:ring-2 focus:ring-blue-500 group" >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            <Layout className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentWorkspace.name}</h2>
                            <p className="text-[10px] font-medium text-gray-500 dark:text-zinc-400 truncate uppercase tracking-tight">Workspace</p>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-[10px] uppercase font-bold text-gray-400 dark:text-zinc-500 tracking-widest">
                        Switch Workspace
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <div className="max-h-60 overflow-y-auto">
                        {workspaces.map((workspace) => (
                            <DropdownMenuItem 
                                key={workspace.id} 
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-6 h-6 rounded bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-zinc-400">
                                        {workspace.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm truncate">{workspace.name}</span>
                                </div>
                                {workspace.id === currentWorkspace.id && (
                                    <Check className="w-4 h-4 text-blue-500" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer text-blue-600 dark:text-blue-400 focus:text-blue-700 dark:focus:text-blue-300 font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workspace
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer text-gray-500 dark:text-zinc-400">
                    <Settings className="w-4 h-4 mr-2" />
                    Workspace Settings
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WorkspaceDropdown;

