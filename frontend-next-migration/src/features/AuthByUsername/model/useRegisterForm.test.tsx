import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useRegisterForm } from './useRegisterForm';
import { useRegisterMutation, useLoginMutation } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('@/entities/Auth', () => ({
    useRegisterMutation: jest.fn(),
    useLoginMutation: jest.fn(),

}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('useRegisterForm', () => {
    const mockT = jest.fn((key) => key);
    const mockStore = configureStore([]);
    const store = mockStore({});

    beforeEach(() => {
        (useForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
        });
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        jest.clearAllMocks();
    });

    const renderWithProvider = (hook: () => any) =>
        renderHook(hook, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        });

    it('should auto-login after successful registration and navigate to home page', async () => {
        // Mock the `register` mutation
        const mockRegist = jest.fn().mockResolvedValue({});

        // Mock the `login` mutation
        const mockLogin = jest.fn().mockResolvedValue({
            accessToken: 'fake-token',
            username: 'testuser',
            Player: {},
            _id: 'user-id',
        });

        (useRegisterMutation as jest.Mock).mockReturnValue([mockRegist, { isLoading: false }]);
        (useLoginMutation as jest.Mock).mockReturnValue([mockLogin, { isLoading: false }]);

        const { result } = renderWithProvider(() => useRegisterForm());

        // Simulate form submission
        await act(async () => {
            await result.current.onFormSubmit({
                username: 'testuser',
                password: 'password123',
                ageConsent: true,
            });
        });

        // Expect the `register` function to be called
        expect(mockRegist).toHaveBeenCalled();

        // ✅ Expect the `login` function to be called
        expect(mockLogin).toHaveBeenCalled();

        // ✅ Expect the router to navigate to the home page
        expect(useRouter().push).toHaveBeenCalledWith('/');
    });


});