import React from 'react';
import { Home, Layout, CheckSquare, Settings, Users, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WorkspaceDropdown from './WorkspaceDropdown';
import MyTasksSidebar from './MyTasksSidebar';
import ProjectsSidebar from './ProjectsSidebar';

interface SidebarProps {
    isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Layout, label: 'Projects', path: '/projects' },
        { icon: CheckSquare, label: 'Board', path: '/board' },
        { icon: BarChart, label: 'Analytics', path: '/analytics' },
        { icon: Users, label: 'Team', path: '/team' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={`fixed sm:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} >
            <div className="h-full flex flex-col overflow-y-auto">
                {/* Brand */}
                <div className="px-6 py-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Layout className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            Flowboards
                        </span>
                    </div>
                </div>

                {/* Workspace Switcher */}
                <div className="px-3">
                    <WorkspaceDropdown />
                </div>

                {/* Main Navigation */}
                <nav className="mt-8 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white'}`} >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-300'}`} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <ProjectsSidebar />
                <MyTasksSidebar />

                {/* Account Settings / User Info at bottom */}
                <div className="mt-auto p-4 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">User Account</p>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 truncate">Free Plan</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
