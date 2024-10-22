'use client';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useCurrentYPosition } from '@/shared/lib/hooks';
import { ScrollTop } from './ScrollTop';

jest.mock('next/navigation', () => ({
    useParams: jest.fn().mockReturnValue({ lng: 'en' }),
}));

jest.mock('@/shared/lib/hooks/useCurrentYPosition', () => ({
    useCurrentYPosition: jest.fn(),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn().mockReturnValue({
        t: (key: string) => key,
    }),
}));

describe('ScrollTop', () => {
    it('should render the button with default text', () => {
        (useCurrentYPosition as jest.Mock).mockReturnValue(0);

        render(<ScrollTop />);

        const button = screen.getByTestId('scroll-to-top-btn');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('upButton');
    });

    it('should render the button with custom text', () => {
        (useCurrentYPosition as jest.Mock).mockReturnValue(0);

        render(<ScrollTop innerText="Scroll to Top" />);

        const button = screen.getByTestId('scroll-to-top-btn');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Scroll to Top');
    });

    it('should show the button when scrolled down', () => {
        (useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight / 5);

        render(<ScrollTop />);

        const button = screen.getByTestId('scroll-to-top-btn');
        expect(button).toHaveClass('show');
    });

    it('should hide the button when scrolled up', () => {
        (useCurrentYPosition as jest.Mock).mockReturnValue(0);

        render(<ScrollTop />);

        const button = screen.getByTestId('scroll-to-top-btn');
        expect(button).not.toHaveClass('show');
    });

    it('should scroll to top when button is clicked', () => {
        window.scrollTo = jest.fn();
        (useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight / 5);

        render(<ScrollTop />);

        const button = screen.getByTestId('scroll-to-top-btn');
        fireEvent.click(button);

        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
