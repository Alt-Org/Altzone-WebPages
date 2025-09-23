import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { useRegisterForm } from '../../model/useRegisterForm';
import RegisterForm from './RegisterForm';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('../../model/useRegisterForm', () => ({
    useRegisterForm: jest.fn(),
}));

describe('RegisterForm', () => {
    const mockT = jest.fn((key) => key);
    const mockHandleSubmit = jest.fn((fn) => fn);
    const mockOnFormSubmit = jest.fn();
    const mockErrors = {};

    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        (useRegisterForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn((callback) => () => callback()),
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrors,
        });
        jest.clearAllMocks();
    });

    const defaultProps = {
        toLoginPage: '/login',
    };

    it('should render form with username, password, repeatPassword fields and age consent checkbox', () => {
        render(<RegisterForm {...defaultProps} />);

        expect(screen.getAllByText('register').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password_again')).toBeInTheDocument();
        expect(screen.getByLabelText('age_Consent')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'register' })).toBeInTheDocument();
    });

    // todo
    // it('should call handleSubmit and onFormSubmit on form submit', () => {
    //     render(<RegisterForm {...defaultProps} />);
    //
    //     const submitButton = screen.getByTestId('submit-button');
    //     fireEvent.click(submitButton);
    //
    //     // expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnFormSubmit);
    //     expect(mockOnFormSubmit).toHaveBeenCalled();
    // });

    it('should display validation errors if present', () => {
        const mockErrorsWithMessages = {
            username: { message: 'username_required' },
            password: { message: 'password_required' },
            repeatPassword: { message: 'repeat_password_required' },
            ageConsent: { message: 'age_consent_required' },
        };
        (useRegisterForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: mockHandleSubmit,
            onFormSubmit: mockOnFormSubmit,
            errors: mockErrorsWithMessages,
        });

        render(<RegisterForm {...defaultProps} />);

        expect(screen.getByText('username_required')).toBeInTheDocument();
        expect(screen.getByText('password_required')).toBeInTheDocument();
        expect(screen.getByText('repeat_password_required')).toBeInTheDocument();
        expect(screen.getByText('age_consent_required')).toBeInTheDocument();
    });
});
