import { useRef } from "react";
import menuIcon from "../../../assets/dashboard/menu-2.png"
import brandLogo from "../../../assets/brand-logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  return (
    <header
      className="h-16 lg:hidden flex items-center px-4 pr-8 justify-between
                       bg-white border-b border-slate-200"
    >
      <div className="flex items-center justify-between w-full">
        <img src={brandLogo} alt="brandLogo" />
        <button className="lg:hidden" onClick={onMenuClick}>
          <img src={menuIcon} className="h-6 w-6 text-slate-800" />
        </button>
      </div>
    </header>
  );
}
