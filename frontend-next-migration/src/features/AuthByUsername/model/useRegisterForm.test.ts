import { renderHook, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { useRegisterForm } from './useRegisterForm';

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('@hookform/resolvers/yup', () => ({
    yupResolver: jest.fn(),
}));

jest.mock('@/entities/Auth', () => ({
    useRegisterMutation: jest.fn(),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('useRegisterForm', () => {
    const mockT = jest.fn((key) => key);
    const toLoginPage = '/login';

    beforeEach(() => {
        (useForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
        });
        (useRegisterMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: null, isLoading: false, error: null },
        ]);
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        jest.clearAllMocks();
    });

    it('should return register, handleSubmit, onFormSubmit, errors, and toLoginPage', () => {
        const { result } = renderHook(() => useRegisterForm(toLoginPage));

        expect(result.current.register).toBeDefined();
        expect(result.current.handleSubmit).toBeDefined();
        expect(result.current.onFormSubmit).toBeDefined();
        expect(result.current.errors).toEqual({});
        expect(result.current.toLoginPage).toBe(toLoginPage);
    });

    it('should call regist on form submit with correct data', async () => {
        const mockRegist = jest.fn();
        (useRegisterMutation as jest.Mock).mockReturnValue([
            mockRegist,
            { data: null, isLoading: false, error: null },
        ]);

        const { result } = renderHook(() => useRegisterForm(toLoginPage));

        const fieldValues = {
            username: 'testuser',
            password: 'password',
            ageConsent: true,
        };
        await act(async () => {
            await result.current.onFormSubmit(fieldValues);
        });

        const expectedData = {
            username: 'testuser',
            password: 'password',
            repeatPassword: 'password',
            Player: {
                uniqueIdentifier: 'testuser',
                backpackCapacity: 100,
                name: 'testuser',
                above13: true,
            },
        };

        expect(mockRegist).toHaveBeenCalledWith(expectedData);
    });

    it('should show success toast on successful registration', () => {
        const mockData = { success: true };
        (useRegisterMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: mockData, isLoading: false, error: null },
        ]);

        const { result, rerender } = renderHook(() => useRegisterForm(toLoginPage));

        act(() => {
            rerender();
        });

        expect(toast.success).toHaveBeenCalledWith('account-created');
    });

    it('should show error toast if there is an error', () => {
        const mockError = { data: { message: ['Registration failed'] } };
        (useRegisterMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: null, isLoading: false, error: mockError },
        ]);

        const { result, rerender } = renderHook(() => useRegisterForm(toLoginPage));

        act(() => {
            rerender();
        });

        expect(toast.error).toHaveBeenCalledWith(mockError.data.message[0]);
    });
});
