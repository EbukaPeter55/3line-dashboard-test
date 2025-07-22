import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import brandLogo from "../../../assets/brand-logo.png";
import { cn } from "@/lib/utils";
import { navItems } from "../shared/dashboard-constant";
import { NavDropdown, NavLink } from "../shared/dashboard-types";

interface SidebarContentProps {
  isCollapsed: boolean;
}

export default function SidebarContent({ isCollapsed }: SidebarContentProps) {
  const location = useLocation(); // Replaced usePathname
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (lbl: string) =>
    setOpen((prev) => (prev === lbl ? null : lbl));

  const renderLink = (item: NavLink, extra = "") => (
    <Link // Replaced Next.js Link with React Router DOM Link
      key={item.href + extra}
      to={item.href} // `to` prop instead of `href`
      className={`flex items-center gap-2 p-2 rounded text-sm
        ${
          location.pathname === item.href // Replaced pathname with location.pathname
            ? "bg-[var(--primary-colour)] text-white"
            : "text-[#A3A3A3] hover:bg-[var(--primary-colour)] hover:text-white dark:text-gray-400 dark:hover:bg-[var(--primary-colour)] dark:hover:text-white"
        }`}
    >
      {item?.image ? (
        <div className="relative h-5 w-5 flex-shrink-0">
          <img // Replaced Next.js Image with standard img
            src={item.image.default.src} // Access .src property of imported image object
            alt={item.label}
            className={`absolute inset-0 transition-opacity
              ${
                location.pathname === item.href
                  ? "opacity-0"
                  : "opacity-100 group-hover:opacity-0"
              }`}
          />
          <img // Replaced Next.js Image with standard img
            src={item.image.active.src} // Access .src property
            alt={`${item.label} active`}
            className={`absolute inset-0 transition-opacity
              ${
                location.pathname === item.href
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
          />
        </div>
      ) : (
        item.icon && (
          <item.icon className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
        )
      )}
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  );

  /* ---------------- render ---------------- */
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center pl-4 border-b shrink-0 border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <img src={brandLogo.src} alt="brandLogo" width={169} height={26} />
        )}{" "}
        {/* Replaced Image with img, access .src */}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          if ("type" in item)
            return (
              <hr
                key={Math.random()}
                className="my-2 border-gray-300 dark:border-gray-700"
              />
            );
        
          if ("href" in item) return renderLink(item);

          /* dropdown */
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
                  "w-full flex items-center justify-between p-2 rounded text-sm",
                  "text-[#A3A3A3] hover:bg-[var(--primary-colour)] hover:text-white dark:text-gray-400 dark:hover:bg-[var(--primary-colour)] dark:hover:text-white"
                )}
              >
                <span className="flex items-center gap-2">
                  {dropdown.icon && (
                    <dropdown.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                  {!isCollapsed && dropdown.label}
                </span>
                {!isCollapsed &&
                  (openNow ? (
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
      </nav>
    </div>
  );
}
