import { HeroGroup, HeroSlug } from '../types/hero';
import { groupHeroesByGroup } from './groupHeroesByGroup';
import { fetchAllHeroes, fetchHeroBySlug } from './heroApi';

jest.mock('@/shared/const/envHelper', () => ({
    envHelper: { directusHost: 'https://directus.test' },
}));

const publishedHero = {
    id: 1,
    slug: HeroSlug.OVEREATER,
    status: 'Published',
    order: 1,
    translations: [
        {
            languages_code: 'en-US',
            title: 'Overeater',
            description: 'Published hero',
            alt: 'Overeater',
            altGif: 'Overeater animated',
        },
    ],
    group: {
        key: HeroGroup.RETROFLECTOR,
        bgColour: '#000',
        translations: [{ languages_code: 'en-US', name: 'Retroflector', description: 'Group' }],
    },
    heroes_stats: [],
};

const response = (data: unknown) =>
    ({
        ok: true,
        json: async () => ({ data }),
        text: async () => JSON.stringify({ data }),
    }) as Response;

describe('heroApi status gating', () => {
    const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        fetchMock.mockReset();
        global.fetch = fetchMock;
    });

    it('does not return an unpublished hero by slug', async () => {
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([]);
        });

        await expect(fetchHeroBySlug('draft-hero' as HeroSlug)).resolves.toBeUndefined();
    });

    it('returns only the published heroes from the all-heroes request', async () => {
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([publishedHero]);
        });

        const heroes = await fetchAllHeroes();

        expect(heroes).toHaveLength(1);
        expect(heroes[0].slug).toBe(HeroSlug.OVEREATER);
    });

    it('groups the published heroes returned by the filtered request', async () => {
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([publishedHero]);
        });

        const heroes = await fetchAllHeroes();
        const result = groupHeroesByGroup(heroes);

        expect(result[HeroGroup.RETROFLECTOR].heroes).toHaveLength(1);
        expect(result[HeroGroup.RETROFLECTOR].heroes[0].slug).toBe(HeroSlug.OVEREATER);
    });
});
