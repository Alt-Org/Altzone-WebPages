import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { useLoginForm } from '../../model/useLoginForm';
import LoginForm from './LoginForm';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/lib/hooks/useIsMobileSize');

jest.mock('../../model/useLoginForm', () => ({
    useLoginForm: jest.fn(),
}));

describe('LoginForm', () => {
    const mockT = jest.fn((key) => key);
    const mockOnFormSubmit = jest.fn();
    const mockOnSuccessLogin = jest.fn();
    const mockErrors = {};

    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: false });
        (useLoginForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn((callback) => () => callback()),
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrors,
        });
        jest.clearAllMocks();
    });

    const defaultProps = {
        onSuccessLogin: mockOnSuccessLogin,
    };

    it('should render form with username and password fields', () => {
        render(<LoginForm {...defaultProps} />);

        expect(screen.getAllByText('log_in').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByLabelText('username')).toBeInTheDocument();
        expect(screen.getByLabelText('password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'log_in' })).toBeInTheDocument();
    });

    it('should render combined username/email label on mobile', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: true });

        render(<LoginForm {...defaultProps} />);

        expect(screen.getByLabelText('username_email')).toBeInTheDocument();
        expect(screen.queryByLabelText('username')).not.toBeInTheDocument();
    });

    it('should render register in-game link pointing to the app store', () => {
        render(<LoginForm {...defaultProps} />);

        const link = screen.getByText('register_in_game_link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should display validation errors if present', () => {
        const mockErrorsWithMessages = {
            username: { message: 'username_required' },
            password: { message: 'password_required' },
        };
        (useLoginForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn((callback) => () => callback()),
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrorsWithMessages,
        });

        render(<LoginForm {...defaultProps} />);

        expect(screen.getByText('username_required')).toBeInTheDocument();
        expect(screen.getByText('password_required')).toBeInTheDocument();
    });
});
