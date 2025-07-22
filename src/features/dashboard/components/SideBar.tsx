import SidebarContent from "./SidebarContent";

interface SideBarProps {
  isCollapsed: boolean;
}

export default function SideBar({ isCollapsed }: SideBarProps) {
  return (
    <aside
      className={`hidden lg:block bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
