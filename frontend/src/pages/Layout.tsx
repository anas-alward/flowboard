import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AppSidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { Loader2Icon } from 'lucide-react'
import { SidebarProvider } from '../components/ui/sidebar'
import type { RootState } from '../app/store'

const Layout = () => {
    const { loading } = useSelector((state: RootState) => state.workspace)
    const dispatch = useDispatch()

    // Initial load of theme
    useEffect(() => {
        dispatch(loadTheme())
    }, [])

    if (loading) return (
        <div className='flex items-center justify-center h-screen bg-white dark:bg-zinc-950'>
            <Loader2Icon className="size-7 text-blue-500 animate-spin" />
        </div>
    )

    return (
        <SidebarProvider>
            <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100 w-full h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <div className="flex-1 p-6 xl:p-10 xl:px-16 overflow-y-auto w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Layout
