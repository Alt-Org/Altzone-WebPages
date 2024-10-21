import { renderHook, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation, authUserActions } from '@/entities/Auth';
import { getJwtExpTimeStamp } from '@/shared/lib/getJwtExpTimeStamp';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from './useLoginForm';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('@hookform/resolvers/yup', () => ({
    yupResolver: jest.fn(),
}));

jest.mock('@/entities/Auth', () => ({
    useLoginMutation: jest.fn(),
    authUserActions: {
        setAccessTokenInfo: jest.fn(),
        setProfile: jest.fn(),
        setIsSessionExpired: jest.fn(),
    },
}));

jest.mock('@/shared/lib/getJwtExpTimeStamp', () => ({
    getJwtExpTimeStamp: jest.fn(),
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

describe('useLoginForm', () => {
    const mockDispatch = jest.fn();
    const mockOnSuccessLogin = jest.fn();
    const mockT = jest.fn((key) => key);

    beforeEach(() => {
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
        });
        (useLoginMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: null, isLoading: false, error: null },
        ]);
        (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
        jest.clearAllMocks();
    });

    it('should return register, handleSubmit, onFormSubmit and errors from useForm', () => {
        const { result } = renderHook(() => useLoginForm({ onSuccessLogin: mockOnSuccessLogin }));

        expect(result.current.register).toBeDefined();
        expect(result.current.handleSubmit).toBeDefined();
        expect(result.current.onFormSubmit).toBeDefined();
        expect(result.current.errors).toEqual({});
    });

    it('should call login on form submit', async () => {
        const mockLogin = jest.fn();
        (useLoginMutation as jest.Mock).mockReturnValue([
            mockLogin,
            { data: null, isLoading: false, error: null },
        ]);

        const { result } = renderHook(() => useLoginForm({ onSuccessLogin: mockOnSuccessLogin }));

        const fieldValues = { username: 'testuser', password: 'password' };
        await act(async () => {
            await result.current.onFormSubmit(fieldValues);
        });

        expect(mockLogin).toHaveBeenCalledWith(fieldValues);
    });

    it('should dispatch actions and show success toast on successful login', () => {
        const mockData = {
            accessToken: 'testtoken',
            username: 'testuser',
            Player: {},
            _id: 'testid',
        };
        (useLoginMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: mockData, isLoading: false, error: null },
        ]);

        const { result, rerender } = renderHook(() =>
            useLoginForm({ onSuccessLogin: mockOnSuccessLogin }),
        );

        act(() => {
            rerender();
        });

        expect(mockDispatch).toHaveBeenCalledWith(
            authUserActions.setAccessTokenInfo({
                accessToken: mockData.accessToken,
                accessTokenExpiresAt: getJwtExpTimeStamp(mockData.accessToken),
            }),
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            authUserActions.setProfile({
                username: mockData.username,
                // @ts-ignore
                Player: mockData.Player,
                // @ts-ignore
                _id: mockData._id,
            }),
        );
        expect(mockDispatch).toHaveBeenCalledWith(authUserActions.setIsSessionExpired(false));
        expect(toast.success).toHaveBeenCalledWith('welcome');
        expect(mockOnSuccessLogin).toHaveBeenCalled();
    });

    it('should show error toast if there is an error', () => {
        const mockError = { data: { message: 'Login failed' } };
        (useLoginMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { data: null, isLoading: false, error: mockError },
        ]);

        const { result, rerender } = renderHook(() =>
            useLoginForm({ onSuccessLogin: mockOnSuccessLogin }),
        );

        act(() => {
            rerender();
        });

        expect(toast.error).toHaveBeenCalledWith(mockError.data.message);
    });
});
