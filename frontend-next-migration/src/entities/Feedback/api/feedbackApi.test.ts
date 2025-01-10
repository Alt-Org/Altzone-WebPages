import { Feedback } from '../model/types/types';

jest.mock('@/entities/Feedback', () => ({
    feedbackApi: jest.fn(),
}));

const correctData: Feedback = {
    rating: 4,
    feedbackText: 'test',
};

describe('Testing feedbackApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Adds feedback to directus', async () => {
        const feedbackApi = jest.fn();

        (feedbackApi as jest.Mock).mockReturnValue(correctData);

        const result = await feedbackApi(correctData);

        expect(feedbackApi).toHaveBeenCalledWith(correctData);
    });
});
