import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';
import { ComingSoon } from './ComingSoon';

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock the useClientTranslation hook
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

describe('ComingSoon', () => {
    const mockRouter = {
        back: jest.fn(),
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key, // Mock translation function
        });
    });

    it('renders all expected elements', () => {
        render(<ComingSoon />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('title');
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('text');
        expect(screen.getByRole('button', { name: /backText/i })).toBeInTheDocument();
    });

    it('calls router.back() when the Go Back button is clicked', () => {
        render(<ComingSoon />);

        const goBackButton = screen.getByRole('button', { name: /backText/i });
        fireEvent.click(goBackButton);

        expect(mockRouter.back).toHaveBeenCalled();
    });
});
