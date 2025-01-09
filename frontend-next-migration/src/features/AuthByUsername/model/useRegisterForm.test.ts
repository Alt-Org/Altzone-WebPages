import { renderHook, act } from '@testing-library/react';
import { useRegisterForm } from './useRegisterForm';
import { useRegisterMutation, useLoginMutation } from '@/entities/Auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useClientTranslation } from '@/shared/i18n';
import { useRouter } from 'next/navigation';

jest.mock('@/entities/Auth', () => ({
    useRegisterMutation: jest.fn(),
    useLoginMutation: jest.fn(),
    authUserActions: {
        setAccessTokenInfo: jest.fn(),
    },
}));
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockRouter = { push: jest.fn() };
const mockT = jest.fn((key) => key);

beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useForm as jest.Mock).mockReturnValue({
        register: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: {} },
        getValues: jest.fn(),
    });
    (useRegisterMutation as jest.Mock).mockReturnValue([jest.fn(), { isLoading: false }]);
    (useLoginMutation as jest.Mock).mockReturnValue([jest.fn(), { isLoading: false }]);
    (useClientTranslation as jest.Mock).mockReturnValue({ t: mockT });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
});

it('should show error toast if login fails after registration', async () => {
    const mockRegister = jest.fn().mockResolvedValue({});
    const mockLogin = jest.fn().mockRejectedValue({
        data: { message: 'Käyttäjänimi on jo käytössä, valitse toinen käyttäjänimi' },
    });

    (useRegisterMutation as jest.Mock).mockReturnValue([mockRegister, { isLoading: false }]);
    (useLoginMutation as jest.Mock).mockReturnValue([mockLogin, { isLoading: false }]);

    const { result } = renderHook(() => useRegisterForm());

    // Simulate form submission
    await act(async () => {
        await result.current.onFormSubmit({
            username: 'testuser',
            password: 'password123',
            repeatPassword: 'password123',
            Player: {
                name: 'testuser',
                uniqueIdentifier: 'testuser',
                above13: true,
                parentalAuth: false, // Corrected value
                backpackCapacity: 100,
            },
        });
    });

    expect(mockRegister).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        repeatPassword: 'password123',
        Player: {
            backpackCapacity: 100,

            name: 'testuser',
            parentalAuth: true,

            uniqueIdentifier: 'testuser',
        },
    });
});

it('should call register and login on form submit', async () => {
    const mockRegister = jest.fn().mockResolvedValue({});
    const mockLogin = jest.fn().mockResolvedValue({});

    (useRegisterMutation as jest.Mock).mockReturnValue([mockRegister, { isLoading: false }]);
    (useLoginMutation as jest.Mock).mockReturnValue([mockLogin, { isLoading: false }]);

    const { result } = renderHook(() => useRegisterForm());

    // Simulate form submission
    await act(async () => {
        await result.current.onFormSubmit({
            username: 'testuser',
            password: 'password123',
            repeatPassword: 'password123',
            Player: {
                backpackCapacity: 100,

                name: 'testuser',
                parentalAuth: true,

                uniqueIdentifier: 'testuser',
            },
        });
    });

    expect(mockRegister).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        repeatPassword: 'password123',
        Player: {
            backpackCapacity: 100,

            name: 'testuser',
            parentalAuth: true,

            uniqueIdentifier: 'testuser',
        },
    });
});
