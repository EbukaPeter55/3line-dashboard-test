import {render, screen} from '@testing-library/react';
import SidebarContent from '@/features/dashboard/components/SidebarContent';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';

jest.mock('lucide-react', () => ({
    ChevronDown: () => <svg data-testid="chevron-down-icon"/>,
    ChevronRight: () => <svg data-testid="chevron-right-icon"/>,
    LogOut: () => <svg data-testid="logout-icon"/>,
    Search: () => <svg data-testid="search-icon"/>,
}));

jest.mock('@/lib/utils', () => ({
    cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('@/features/dashboard/shared/dashboard-constant', () => ({
    navItems: [
        {label: 'Dashboard', href: '/dashboard', icon: () => <svg data-testid="dashboard-icon"/>},
        {type: 'divider'},
        {label: 'Settings', href: '/settings', icon: () => <svg data-testid="settings-icon"/>},
        {label: 'Help', action: 'logout', icon: () => <svg data-testid="help-icon"/>},
    ],
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({pathname: '/dashboard', search: '', hash: '', state: null, key: 'test'}),
    Link: jest.fn(({children, to, className, onClick}) => (
        <a href={to as string} className={className} onClick={onClick}>
            {children}
        </a>
    )),
}));

describe('SidebarContent', () => {
    test('renders the SidebarContent component successfully', () => {
        render(
            <BrowserRouter>
                <SidebarContent isCollapsed={false}/>
            </BrowserRouter>
        );

        const brandLogoElement = screen.getByAltText('brandLogo');
        expect(brandLogoElement).toBeInTheDocument();
    });
});
