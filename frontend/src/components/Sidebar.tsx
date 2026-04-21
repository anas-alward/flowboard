import React from 'react';
import { Home, Layout, CheckSquare, Settings, Users, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WorkspaceDropdown from './WorkspaceDropdown';
import MyTasksSidebar from './MyTasksSidebar';
import ProjectsSidebar from './ProjectsSidebar';
import {
  Sidebar ,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from './ui/sidebar';

const AppSidebar: React.FC = () => {
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
        <Sidebar>
            <SidebarHeader className="p-4">
                <WorkspaceDropdown />
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <SidebarMenuItem key={item.path}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.label}
                                            className={isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}
                                        >
                                            <Link to={item.path} className="flex items-center gap-2 w-full">
                                                <item.icon className={isActive ? 'text-blue-600 dark:text-blue-400' : ''} />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="my-2" />
                
                <ProjectsSidebar />
                <MyTasksSidebar />
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">User Account</p>
                        <p className="text-xs text-gray-500 dark:text-zinc-500 truncate">Free Plan</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;

