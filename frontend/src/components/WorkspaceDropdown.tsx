import React, { useState } from 'react';
import { ChevronDown, Plus, Check, MoreVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const WorkspaceDropdown: React.FC = () => {
    const { currentWorkspace, workspaces } = useSelector((state: RootState) => state.workspace);
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition duration-200" >
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {currentWorkspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 truncate uppercase tracking-wider">Workspace</p>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentWorkspace.name}</h2>
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in duration-200" >
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-zinc-700">
                        <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-zinc-500 tracking-widest px-1">Switch Workspace</p>
                    </div>

                    <div className="max-h-60 overflow-y-auto mt-1">
                        {workspaces.map((workspace) => (
                            <button key={workspace.id} className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-zinc-700 group transition duration-200" >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-6 h-6 rounded bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-zinc-400">
                                        {workspace.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-zinc-300 truncate">{workspace.name}</span>
                                </div>
                                {workspace.id === currentWorkspace.id ? (
                                    <Check className="w-4 h-4 text-blue-500" />
                                ) : (
                                    <div className="w-4 h-4" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-2 border-t border-gray-100 dark:border-zinc-700 mt-2">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200 font-medium" >
                            <Plus className="w-4 h-4" />
                            Create Workspace
                        </button>
                    </div>

                    <button className="w-full flex items-center justify-between px-3 py-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-700 transition duration-200" >
                        <div className="flex items-center gap-2 text-sm">
                            <MoreVertical className="w-4 h-4" />
                            Workspace Settings
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default WorkspaceDropdown;
