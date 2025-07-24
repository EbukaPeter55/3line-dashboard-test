import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardSettingsPage from "@/features/dashboard/pages/DashboardSettings";

jest.mock('@/components/ui/tabs', () => ({
    Tabs: ({children, ...props}) => <div data-testid="mock-tabs" {...props}>{children}</div>,
    TabsList: ({children, ...props}) => <div data-testid="mock-tabs-list" {...props}>{children}</div>,
    TabsTrigger: ({children, ...props}) => <button
        data-testid={`mock-tab-trigger-${props.value}`} {...props}>{children}</button>,
    TabsContent: ({children, ...props}) => <div
        data-testid={`mock-tab-content-${props.value}`} {...props}>{children}</div>,
}));

jest.mock('@/components/ui/input', () => ({
    Input: (props) => <input data-testid="mock-input" {...props} />,
}));

jest.mock('@/components/ui/button', () => ({
    Button: ({children, ...props}) => <button data-testid="mock-button" {...props}>{children}</button>,
}));

jest.mock('@/components/ui/label', () => ({
    Label: ({children, ...props}) => <label data-testid="mock-label" {...props}>{children}</label>,
}));

jest.mock('@/components/ui/radio-group', () => ({
    RadioGroup: ({children, ...props}) => <div data-testid="mock-radio-group" {...props}>{children}</div>,
    RadioGroupItem: (props) => <input type="radio" data-testid="mock-radio-group-item" {...props} />,
}));

jest.mock('@/components/ui/table/table', () => ({
    DataTable: (props) => <div data-testid="mock-data-table" {...props}>Data Table</div>,
}));

jest.mock('@/lib/utils', () => ({
    cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('lucide-react', () => ({
    Plus: () => <svg data-testid="plus-icon"/>,
}));

describe('DashboardSettingsPage', () => {
    it('renders the DashboardSettingsPage component successfully', () => {
        render(<DashboardSettingsPage/>);

        expect(screen.getByRole('heading', {name: /settings/i})).toBeInTheDocument();
        expect(screen.getByText(/manage your team and preferences here\./i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-tabs')).toBeInTheDocument();
        expect(screen.getByTestId('mock-tab-content-roles')).toBeInTheDocument();
    });
});
