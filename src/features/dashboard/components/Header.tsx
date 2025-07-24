import menuIcon from "../../../assets/dashboard/menu-2.png"
import brandLogo from "../../../assets/brand-logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {

  return (
    <header
      className="h-16 lg:hidden flex items-center px-4 pr-8 justify-between
                       bg-white border-b border-slate-200"
    >
      <div className="flex items-center justify-between w-full">
        <img src={brandLogo} alt="brandLogo" />
        <button aria-label="Toggle menu" className="lg:hidden" onClick={onMenuClick}>
          <img alt="Menu Icon" src={menuIcon} className="h-6 w-6 text-slate-800" />
        </button>
      </div>
    </header>
  );
}
