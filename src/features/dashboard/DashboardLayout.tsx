import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import SideBar from './components/SideBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MobileDrawer from './components/ MobileDrawer';


export default function DashboardLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleMenuClick = () => setIsOpen(!isOpen);
    const handleDrawerClose = () => setIsOpen(false);
    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <SideBar isCollapsed={isSidebarCollapsed} />

            {/* Mobile Drawer */}
            <MobileDrawer open={isOpen} onClose={handleDrawerClose} />

            <div className="flex-1 flex flex-col">
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 left-64 z-50 bg-white border rounded-full p-1 shadow transition-all hidden lg:block cursor-pointer dark:bg-gray-700 dark:border-gray-600"
                    style={{ left: isSidebarCollapsed ? '3.5rem' : '15.5rem' }} // 3.5rem for collapsed, 15.5rem for expanded
                >
                    {isSidebarCollapsed ? <ChevronRight size={16} className="dark:text-gray-100" /> : <ChevronLeft size={16} className="dark:text-gray-100" />}
                </button>

                <main className="p-4 overflow-y-auto flex-1 bg-slate-50 dark:bg-gray-900">
                    <Outlet /> {/* This is where nested routes (like DashboardPage, SettingsPage) will render */}
                </main>
            </div>
        </div>
    );
}