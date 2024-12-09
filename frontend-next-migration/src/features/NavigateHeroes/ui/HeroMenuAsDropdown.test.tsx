import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useClientTranslation } from '@/shared/i18n';
import { HeroSlug } from '@/entities/Hero';
import HeroMenuAsDropdown from '@/features/NavigateHeroes/ui/HeroMenuAsDropdown';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));
const props = {
    onClickCallback: (heroSlug: HeroSlug) => {
        expect(heroSlug === 'researcher');
    },
};
const setup = (jsx: JSX.Element) => {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
};
describe('HeroMenuAsDropdown', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    test('render components', async () => {
        const { user } = setup(<HeroMenuAsDropdown {...props} />);

        await user.click(screen.getByRole('button'));
        await user.click(screen.getByTestId('INTELLECTUALIZER.name'));
        expect(
            screen.getByTestId('INTELLECTUALIZER.heroes.Researcher.title_span'),
        ).toHaveTextContent('INTELLECTUALIZER.heroes.Researcher.title');
        await user.click(screen.getByTestId('INTELLECTUALIZER.heroes.Researcher.title_span'));
    });
});
