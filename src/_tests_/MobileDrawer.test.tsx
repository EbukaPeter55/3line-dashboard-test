import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileDrawer from "@/features/dashboard/components/MobileDrawer";

// Mock the SidebarContent component
jest.mock('@/features/dashboard/components/SidebarContent', () => {
    return function MockSidebarContent() {
        return <div data-testid="mock-sidebar-content"/>;
    };
});

// Mock the Shadcn UI Sheet components
jest.mock('@/components/ui/sheet', () => ({
    Sheet: ({children}: { children: React.ReactNode }) => <div data-testid="sheet-root">{children}</div>,
    SheetContent: ({children}: { children: React.ReactNode; side?: string; className?: string }) => (
        <div data-testid="sheet-content">{children}</div>
    ),
}));

describe('MobileDrawer', () => {
    test('renders the MobileDrawer component successfully', () => {
        const mockOnClose = jest.fn();
        render(<MobileDrawer open={true} onClose={mockOnClose}/>);

        const sheetContent = screen.getByTestId('sheet-content');
        expect(sheetContent).toBeInTheDocument();

        const sidebarContent = screen.getByTestId('mock-sidebar-content');
        expect(sidebarContent).toBeInTheDocument();
    });
});
