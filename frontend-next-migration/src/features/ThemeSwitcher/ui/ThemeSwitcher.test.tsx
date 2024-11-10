import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useTheme, Theme } from '@/app/_providers/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

jest.mock('@/app/_providers/ThemeProvider', () => ({
    useTheme: jest.fn(),
    Theme: {
        LIGHT: 'light',
        DARK: 'dark',
    },
}));

describe('ThemeSwitcher', () => {
    it('should render the button with LightIcon when theme is light', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: Theme.LIGHT,
            toggleTheme: jest.fn(),
        });

        render(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(screen.getByAltText('light icon')).toBeInTheDocument();
    });

    it('should render the button with DarkIcon when theme is dark', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: Theme.DARK,
            toggleTheme: jest.fn(),
        });

        render(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(screen.getByAltText('dark icon')).toBeInTheDocument();
    });

    it('should toggle theme when button is clicked', () => {
        const toggleTheme = jest.fn();
        (useTheme as jest.Mock).mockReturnValue({
            theme: Theme.LIGHT,
            toggleTheme,
        });

        render(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
});
