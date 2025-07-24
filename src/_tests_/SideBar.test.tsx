import {render, screen} from '@testing-library/react';
import SideBar from '@/features/dashboard/components/SideBar';
import '@testing-library/jest-dom';

jest.mock('@/features/dashboard/components/SidebarContent', () => {
    return function MockSidebarContent() {
        return <div data-testid="mock-sidebar-content"/>;
    };
});

describe('SideBar', () => {
    test('renders the SideBar component successfully', () => {
        render(<SideBar isCollapsed={false}/>); // isCollapsed can be true or false

        const sidebarElement = screen.getByRole('complementary');
        expect(sidebarElement).toBeInTheDocument();
    });
});
