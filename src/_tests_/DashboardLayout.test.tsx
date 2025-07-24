import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/DashboardLayout';
import '@testing-library/jest-dom';

jest.mock('@/features/dashboard/components/SideBar', () => {
    return function MockSideBar() {
        return <aside data-testid="mock-sidebar"/>;
    };
});

jest.mock('@/features/dashboard/components/MobileDrawer', () => {
    return function MockMobileDrawer() {
        return <div data-testid="mock-mobile-drawer"/>;
    };
});

jest.mock('@/features/dashboard/components/Header', () => {
    return function MockHeader() {
        return <header data-testid="mock-header"/>;
    };
});

jest.mock('lucide-react', () => ({
    ChevronLeft: () => <svg data-testid="chevron-left-icon"/>,
    ChevronRight: () => <svg data-testid="chevron-right-icon"/>,
}));

describe('DashboardLayout', () => {
    test('renders the DashboardLayout component successfully', () => {
        render(
            <MemoryRouter>
                <DashboardLayout/>
            </MemoryRouter>
        );

        expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('mock-mobile-drawer')).toBeInTheDocument();
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();

        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
        expect(screen.getByTestId('chevron-left-icon') || screen.getByTestId('chevron-right-icon')).toBeInTheDocument();
    });
});
