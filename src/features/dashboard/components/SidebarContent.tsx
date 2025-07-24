import {useState} from "react";
import {useLocation, Link} from "react-router-dom";
import {ChevronDown, ChevronRight, LogOut, Search} from "lucide-react";
import brandLogo from "../../../assets/brand-logo.png";
import newFeaturesImage from "../../../assets/dashboard/new-features.png";
import userAvatar from "../../../assets/dashboard/avatar.png";

import {cn} from "@/lib/utils";
import {navItems} from "../shared/dashboard-constant";
import {NavDropdown, NavLink} from "../shared/dashboard-types";

interface SidebarContentProps {
    isCollapsed: boolean;
}

const handleLogout = () => {
    //Todo: Handle logout logic here
};

export default function SidebarContent({isCollapsed}: SidebarContentProps) {
    const location = useLocation();
    const [open, setOpen] = useState<string | null>(null);

    const toggle = (lbl: string) =>
        setOpen((prev) => (prev === lbl ? null : lbl));

    const renderLink = (item: NavLink, extra = "") => {
        // Handle the logout item separately as it's a button, not a link
        if (item.action === 'logout') {
            return (
                <button
                    key={item.href + extra}
                    onClick={handleLogout}
                    className={cn(
                        `w-full flex items-center gap-2 p-2 rounded text-sm`,
                        `text-[#A3A3A3] hover:bg-[var(--primary-colour)] hover:text-white`
                    )}
                >
                    {item.icon && (
                        <item.icon className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400"/>
                    )}
                    {!isCollapsed && <span>{item.label}</span>}
                </button>
            );
        }

        return (
            <Link
                key={item.href + extra}
                to={item.href}
                className={cn(
                    "flex items-center gap-2 p-2 rounded text-sm transition-colors duration-200",
                    location.pathname === item.href
                        ? "bg-[#F9FAFB] text-[#1A1A1A] font-semibold" // Active state
                        : "text-[#667085] hover:bg-gray-100 hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                )}
            >
                {item?.image ? (
                    <div className="relative h-5 w-5 flex-shrink-0">
                        <img
                            src={item.image.default}
                            alt={item.label}
                            className={cn(
                                "absolute inset-0 transition-opacity",
                                location.pathname === item.href ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                            )}
                        />
                        <img
                            src={item.image.active}
                            alt={`${item.label} active`}
                            className={cn(
                                "absolute inset-0 transition-opacity",
                                location.pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                        />
                    </div>
                ) : (
                    item.icon && (
                        <item.icon
                            className={cn(
                                "h-4 w-4 flex-shrink-0",
                                location.pathname === item.href
                                    ? "text-[#1A1A1A]"
                                    : "text-gray-500 dark:text-gray-400 group-hover:text-[#1A1A1A]"
                            )}
                        />
                    )
                )}
                {!isCollapsed && (
                    <span className={cn(
                        "whitespace-nowrap",
                        location.pathname === item.href ? "text-[#1A1A1A]" : "text-[#667085]"
                    )}>
              {item.label}
                        {item.label === 'Dashboard' && item.count !== undefined && (
                            <span
                                className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.count}
                  </span>
                        )}
            </span>
                )}
            </Link>
        );
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-800">
            {/* Brand Logo */}
            <div className="h-16 flex items-center pl-4 border-b shrink-0 border-gray-200">
                {!isCollapsed && (
                    <img src={brandLogo} alt="brandLogo" width={169} height={26}/>
                )}{" "}
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
                    <input
                        type="text"
                        placeholder={!isCollapsed ? "Search..." : ""}
                        className={`w-full py-2 pl-9 pr-3 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              ${isCollapsed ? "sr-only" : ""}`}
                        aria-label="Search sidebar"
                    />
                    {isCollapsed && (
                        <Search className="h-5 w-5 text-gray-500"/>
                    )}
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="mb-4 overflow-y-auto p-4 space-y-2">
                {navItems.map((item, idx) => {
                    if ("type" in item && item.type === "divider")
                        return (
                            <hr
                                key={idx}
                                className="my-2 border-gray-300 dark:border-gray-700"
                            />
                        );

                    // Render simple links/buttons (including logout)
                    if ("href" in item || ("action" in item && item.action === "logout")) {
                        return renderLink(item as NavLink);
                    }

                    /* Dropdown logic */
                    const dropdown = item as NavDropdown;
                    const openNow = open === dropdown.label;
                    const isBizOrg = dropdown.label === "Bliz Organization";

                    return (
                        <div
                            key={dropdown.label}
                            className={
                                isBizOrg
                                    ? "border border-gray-300 rounded-lg p-1 mt-[4rem] dark:border-gray-700"
                                    : undefined
                            }
                        >
                            <button
                                onClick={() => toggle(dropdown.label)}
                                className={cn(
                                    "w-full flex items-center justify-between p-2 rounded text-sm transition-colors duration-200",
                                    "text-[#667085] hover:bg-gray-100 hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                )}
                            >
                <span className="flex items-center gap-2">
                  {dropdown.icon && (
                      <dropdown.icon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                  )}
                    {!isCollapsed && dropdown.label}
                </span>
                                {!isCollapsed &&
                                    (openNow ? (
                                        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                    ))}
                            </button>
                            {openNow && (
                                <div className="ml-6 mt-2 space-y-1">
                                    {dropdown.children.map((c, idx) =>
                                        "type" in c ? (
                                            <hr
                                                key={idx}
                                                className="border-gray-300 dark:border-gray-700"
                                            />
                                        ) : (
                                            renderLink(c as NavLink, `child-${idx}`)
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* New Features Section */}
                {!isCollapsed && (
                    <div
                        className="bg-[var(--light-background)] p-4 rounded-lg text-center mt-6 relative overflow-hidden">
                        <div className="text-left mb-4">
                            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">New features available!</h3>
                            <p className="text-xs text-[#667085] mb-2">
                                Check out the new dashboard view. Pages now load faster.
                            </p>
                        </div>
                        <img
                            src={newFeaturesImage}
                            alt="New Features Background"
                            className="inset-0 w-full h-full object-cover"
                        />
                        <div className="text-left">
                            <Link to="/dashboard/new-features"
                                  className="text-xs font-semibold text-[#667085] hover:underline">
                                Dismiss
                            </Link>
                            <span className="text-xs font-semibold text-[#6941C6] ml-1">
                <Link to="/dashboard/whats-new" className="hover:underline">What's new?</Link>
              </span>
                        </div>
                    </div>
                )}
            </nav>

            {/* User Profile / Logout Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3 shrink-0">
                <img
                    src={userAvatar}
                    alt="Olivia Rhye"
                    className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                />
                {!isCollapsed && (
                    <div className="flex flex-col flex-grow text-left">
                        <span className="font-semibold text-sm text-[#1A1A1A] whitespace-nowrap">Olivia Rhye</span>
                        <span className="text-xs text-[#667085] whitespace-nowrap">olivia@untitledui.com</span>
                    </div>
                )}
                {!isCollapsed && (
                    <button onClick={handleLogout}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded">
                        <LogOut className="h-5 w-5"/>
                    </button>
                )}
            </div>
        </div>
    );
}
