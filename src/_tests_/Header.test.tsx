import {render, screen} from '@testing-library/react';
import Header from "@/features/dashboard/components/Header";
import '@testing-library/jest-dom';

describe('Header', () => {
    test('renders the Header component successfully', () => {
        const mockOnMenuClick = jest.fn();
        render(<Header onMenuClick={mockOnMenuClick}/>);

        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });
});
