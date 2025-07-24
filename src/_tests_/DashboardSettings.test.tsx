import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

const originalInnerWidth = global.innerWidth;

beforeAll(() => {
    Object.defineProperty(global, 'innerWidth', {writable: true, configurable: true, value: 1024});
});

afterAll(() => {
    Object.defineProperty(global, 'innerWidth', {writable: true, configurable: true, value: originalInnerWidth});
});

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

jest.mock('@/components/ui/custom-tabs', () => ({
    CustomTabs: ({children, ...props}) => <div data-testid="mock-tabs" {...props}>{children}</div>,
    CustomTabsList: ({children, ...props}) => <div data-testid="mock-tabs-list" {...props}>{children}</div>,
    CustomTabTrigger: ({children, ...props}) => <button
        data-testid={`mock-tab-trigger-${props.value}`} {...props}>{children}</button>,
    CustomTabContent: ({children, ...props}) => <div
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
    RadioGroup: ({children, onValueChange, ...props}) => <div
        data-testid="mock-radio-group" {...props}>{children}</div>,
    RadioGroupItem: (props) => <input type="radio" data-testid="mock-radio-group-item" {...props} />,
}));

jest.mock('@/components/ui/select', () => ({
    Select: ({children, onValueChange, ...props}) => <div data-testid="mock-select" {...props}>{children}</div>,
    SelectTrigger: ({children, ...props}) => <button data-testid="mock-select-trigger" {...props}>{children}</button>,
    SelectValue: ({children, ...props}) => <span data-testid="mock-select-value" {...props}>{children}</span>,
    SelectContent: ({children, ...props}) => <div data-testid="mock-select-content" {...props}>{children}</div>,
    SelectItem: ({children, ...props}) => <div data-testid="mock-select-item" {...props}>{children}</div>,
}));

jest.mock('@/components/ui/table/table', () => ({
    DataTable: ({
                    columns,
                    data,
                    pagination,
                    hasTableTitle,
                    tableTitle,
                    emptyTitle,
                    emptyDescription,
                    showUpAndDownArrows,
                    enableRowSelection,
                    onRowSelectionChange,
                    ...restProps
                }) => (
        <div data-testid="mock-data-table" {...restProps}>
            Data Table (Mocked)
        </div>
    ),
}));

jest.mock('@/lib/utils', () => ({
    cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('lucide-react', () => ({
    Plus: () => <svg data-testid="plus-icon"/>,
}));

import DashboardSettingsPage from "@/features/dashboard/pages/DashboardSettings/DashboardSettings";

describe('DashboardSettingsPage', () => {
    it('renders the DashboardSettingsPage component successfully', () => {
        render(<DashboardSettingsPage/>);

        expect(screen.getByRole('heading', {name: /settings/i})).toBeInTheDocument();
        expect(screen.getByText(/manage your team and preferences here\./i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-tabs')).toBeInTheDocument();
        expect(screen.getByTestId('mock-tab-content-roles')).toBeInTheDocument();
        expect(screen.getByTestId('mock-data-table')).toBeInTheDocument();
    });
});
