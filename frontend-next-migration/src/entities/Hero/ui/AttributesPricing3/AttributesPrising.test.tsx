import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useClientTranslation } from '@/shared/i18n';
import { AttributesPricing3 } from './AttributesPricingV3';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));
const props = {
    stats: [
        { name: 'resistance', defaultLevel: 1, rarityClass: 1, color: 'rgb(153,0,255)' },
        { name: 'hp', defaultLevel: 2, rarityClass: 3, color: 'rgb(0,255,0)' },
        { name: 'size', defaultLevel: 5, rarityClass: 8, color: 'rgb(224,102,102)' },
        { name: 'impactForce', defaultLevel: 3, rarityClass: 7, color: 'rgb(255,153,0)' },
        { name: 'speed', defaultLevel: 2, rarityClass: 10, color: 'rgb(0,255,255)' },
    ],
};
const setup = (jsx: JSX.Element) => {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
};
describe('AttributesPricing', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    test('render components', async () => {
        const { user } = setup(<AttributesPricing3 {...props} />);

        await user.selectOptions(screen.getByTestId('stat'), 'size');
        await user.selectOptions(screen.getByTestId('toLevel'), '6');
        expect(screen.getByTestId('price')).toHaveTextContent('200');
    });
});
