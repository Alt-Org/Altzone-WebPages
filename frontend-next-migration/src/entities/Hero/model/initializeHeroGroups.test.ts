import { fetchAllHeroes } from './heroApi';
import { initializeHeroGroupsFromDirectus } from './initializeHeroGroups';
import { HeroGroup, HeroSlug } from '../types/hero';

jest.mock('./heroApi', () => ({
    fetchAllHeroes: jest.fn(),
}));

const mockedFetchAllHeroes = jest.mocked(fetchAllHeroes);

describe('initializeHeroGroupsFromDirectus', () => {
    it('groups the heroes returned by Directus', async () => {
        mockedFetchAllHeroes.mockResolvedValue([
            {
                id: 1,
                slug: HeroSlug.OVEREATER,
                title: 'Overeater',
                groupEnum: HeroGroup.RETROFLECTOR,
                groupName: 'Retroflector',
                groupDescription: 'Group description',
                groupBgColour: '#000',
                groupLabel: '',
                srcImg: '',
                srcGif: '',
                alt: '',
                altGif: '',
                rarityClass: 'common',
                description: '',
                stats: [],
            },
        ]);

        const groups = await initializeHeroGroupsFromDirectus('en');

        expect(groups.RETROFLECTOR.heroes).toHaveLength(1);
        expect(groups.RETROFLECTOR.heroes[0].title).toBe('Overeater');
    });
});
