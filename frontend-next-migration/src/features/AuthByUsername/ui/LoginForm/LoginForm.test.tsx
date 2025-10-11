import { render, screen, fireEvent } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from '../../model/useLoginForm';
import LoginForm from './LoginForm';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('../../model/useLoginForm', () => ({
    useLoginForm: jest.fn(),
}));

describe('LoginForm', () => {
    const mockT = jest.fn((key) => key);
    const mockHandleSubmit = jest.fn((fn) => fn);
    const mockOnFormSubmit = jest.fn();
    const mockOnSuccessLogin = jest.fn();
    const mockErrors = {};

    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        (useLoginForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn((callback) => () => callback()),
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrors,
        });
        jest.clearAllMocks();
    });

    const defaultProps = {
        toRegisterPage: '/register',
        onSuccessLogin: mockOnSuccessLogin,
        toForgottenPwPage: '/forgot-password',
    };

    it('should render form with username and password fields', () => {
        render(<LoginForm {...defaultProps} />);

        expect(screen.getAllByText('log_in').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'log_in' })).toBeInTheDocument();
    });

    // todo
    // it('should call handleSubmit and onFormSubmit on form submit', () => {
    //     render(<LoginForm {...defaultProps} />);
    //
    //     const submitButton = screen.getByRole('button', { name: 'send' });
    //     fireEvent.click(submitButton);
    //
    //     expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnFormSubmit);
    //     expect(mockOnFormSubmit).toHaveBeenCalled();
    // });

    it('should display validation errors if present', () => {
        const mockErrorsWithMessages = {
            username: { message: 'username_required' },
            password: { message: 'password_required' },
        };
        (useLoginForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: mockHandleSubmit,
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrorsWithMessages,
        });

        render(<LoginForm {...defaultProps} />);

        expect(screen.getByText('username_required')).toBeInTheDocument();
        expect(screen.getByText('password_required')).toBeInTheDocument();
    });
});
