import { useForm } from 'react-hook-form';
import { useCreateClanMutation } from '@/entities/Clan';
import { act, renderHook } from '@testing-library/react';
import { useNewClanForm } from './useNewClanForm';

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('@hookform/resolvers/yup', () => ({
    yupResolver: jest.fn(),
}));

jest.mock('@/entities/Clan', () => ({
    useCreateClanMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('onFormSubmit', () => {
    const mockCreate = jest.fn();
    const mockOnSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useForm as jest.Mock).mockReturnValue({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            formState: { errors: {} },
            setValue: jest.fn(),
        });
        (useCreateClanMutation as jest.Mock).mockReturnValue([
            mockCreate,
            { data: null, isLoading: false, error: null },
        ]);
    });

    it('should check that onSubmitForm correctly convert data for api', async () => {
        const { result } = renderHook(() => useNewClanForm({ onSuccess: mockOnSuccess }));

        const mockValues = {
            gameCoins: 1,
            isOpen: true,
            name: 'mandoliini',
            tag: 'mandoliini',
            phrase: 'phrase',
            labels: [
                {
                    label: 'test1',
                    value: 'TEST1',
                },
                {
                    label: 'test2',
                    value: 'TEST2',
                },
            ],
        };

        const newMockValues = {
            gameCoins: 1,
            isOpen: true,
            name: 'mandoliini',
            tag: 'mandoliini',
            phrase: 'phrase',
            labels: ['test1', 'test2'],
        };

        await act(async () => {
            await result.current.onFormSubmit(mockValues);
        });

        expect(mockCreate).toHaveBeenCalledWith(newMockValues);
    });
});
