import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { scrollToBottom } from '../model/scrollToBottom/scrollToBottom';
import { ScrollBottomButton } from './ScrollBottomButton';

jest.mock('../model/scrollToBottom/scrollToBottom', () => ({
    scrollToBottom: jest.fn(),
}));

describe('ScrollBottomButton', () => {
    const setup = (props = {}) => {
        render(<ScrollBottomButton {...props} />);
    };

    test('renders the button with default text', () => {
        setup();
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toBeInTheDocument();
    });

    test('renders the button with custom text', () => {
        setup({ text: 'Scroll Down' });
        const button = screen.getByRole('button', { name: /scroll down/i });
        expect(button).toBeInTheDocument();
    });

    //todo fix
    // test('calls scrollToBottom on button click', () => {
    //     setup();
    //     const button = screen.getByRole('button', { name: /play/i });
    //     fireEvent.click(button);
    //     expect(scrollToBottom).toHaveBeenCalledWith(50000, expect.any(Object));
    // });

    test('applies custom className', () => {
        const customClass = 'custom-button-class';
        setup({ className: customClass });
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toHaveClass(customClass);
    });
});
