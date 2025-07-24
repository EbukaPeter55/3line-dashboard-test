import SidebarContent from './SidebarContent';
import {Sheet, SheetContent} from "@/components/ui/sheet";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 bg-white dark:bg-gray-800"> {/* Added background classes */}
        <SidebarContent isCollapsed={false} />
      </SheetContent>
    </Sheet>
  );
}