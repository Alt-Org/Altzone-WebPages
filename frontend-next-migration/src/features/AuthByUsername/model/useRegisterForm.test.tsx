import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRegisterForm } from './useRegisterForm';
import { useRegisterMutation, useLoginMutation } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getJwtExpTimeStamp } from '@/shared/lib/getJwtExpTimeStamp';
import { profileActions } from '@/entities/Profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationRegisterSchema } from '../validations';

// Mock setup
global.fetch = jest.fn();
const mockPush = jest.fn();
jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({ push: mockPush })),
}));

// Create mutation mocks
const mockRegisterMutation = jest.fn();
const mockLoginMutation = jest.fn();

jest.mock('@/entities/Auth', () => ({
    useRegisterMutation: () => [mockRegisterMutation, { isLoading: false }],
    useLoginMutation: () => [mockLoginMutation, { isLoading: false }],
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(() => ({ t: jest.fn((key) => key) })),
}));

describe('useRegisterForm', () => {
    beforeEach(() => {
        (useForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
            getValues: jest.fn(),
        });
        jest.clearAllMocks();
    });
    describe('useRegisterForm', () => {
        it('should auto-login after successful registration and navigate to home page', async () => {
            // Arrange
            const { result } = renderHook(() => useRegisterForm());

            // Act
            await act(async () => {
                await result.current.onFormSubmit({
                    username: 'test',
                    password: 'test123',
                    ageConsent: true,
                });
            });

            // Assert
            expect(mockPush).toHaveBeenCalledWith('/');
            expect(toast.success).toHaveBeenCalledWith('account-created');
        });
    });
    // check  error toast was shown
    expect(toast.error).toHaveBeenCalledWith(
        'käyttäjätunnus on jo käytössä, Ole hyvä valitse toinen käyttäjätunnus',
    );

    // Verify login was not called after failed registration
    expect(mockLoginMutation).not.toHaveBeenCalled();

    // no navigation occurred
    expect(mockPush).not.toHaveBeenCalled();
});
it('should not navigate when form validation fails', async () => {
    mockRegisterMutation.mockResolvedValue({ data: { id: 1, username: 'test' } });

    // Verify navigation did not occur
    expect(mockPush).not.toHaveBeenCalled();
});
