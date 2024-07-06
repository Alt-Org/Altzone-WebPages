import { render, fireEvent } from '@testing-library/react';
import { NavGoBackButton } from './NavGoBackButton';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

// Define a type for mocked useRouter
interface MockRouter {
    back: jest.Mock;
}

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('NavGoBackButton component', () => {
    it('renders correctly', () => {
        // Mock useRouter implementation
        const mockRouter: MockRouter = { back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        // Render the component
        const { getByText } = render(<NavGoBackButton />);

        // Assert that the component renders the "< Uutiset" text
        expect(getByText('< Uutiset')).toBeInTheDocument();
    });

    it('handles click event correctly', () => {
        // Mock useRouter implementation
        const mockRouter: MockRouter = { back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        // Render the component
        const { getByText } = render(<NavGoBackButton />);

        // Simulate a click on the component
        fireEvent.click(getByText('< Uutiset'));

        // Expect the router.back function to be called once
        expect(mockRouter.back).toHaveBeenCalledTimes(1);
    });

    it('applies className prop correctly', () => {
        // Mock useRouter implementation
        const mockRouter: MockRouter = { back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        // Render the component with a custom className
        const { container } = render(<NavGoBackButton className="custom-class" />);

        // Assert that the rendered element contains both default and custom classes
        expect(container.firstChild).toHaveClass('NavGoBackButton');
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
